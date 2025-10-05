"use client"

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface TrackingData {
  timestamp: string
  page: string
  userAgent: string
  language: string
  screenResolution: string
  timezone: string
  referrer: string
  ip?: string
  location?: {
    country?: string
    region?: string
    city?: string
    latitude?: number
    longitude?: number
    isp?: string
  }
  sessionId: string
  visitDuration?: number
  previousPage?: string
}

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1424322163980107788/oAcBxPrySgHMvAIE7zIVhF8vg3QQgQMxIahs6GpWMGWh_WrBg7PXE_zZD5pSMX2RQEBc'

export function SuhaibTracker() {
  const pathname = usePathname()
  const [sessionId] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('suhaib-session-id') || 
             Math.random().toString(36).substring(2) + Date.now().toString(36)
    }
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  })
  const [visitStartTime] = useState(() => Date.now())
  const [previousPage, setPreviousPage] = useState<string>('')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Store session ID
    sessionStorage.setItem('suhaib-session-id', sessionId)

    // Get location data
    const getLocationData = async (): Promise<TrackingData['location']> => {
      try {
        // Try to get IP and location from a free service
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        
        return {
          country: data.country_name,
          region: data.region,
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude,
          isp: data.org
        }
      } catch (error) {
        console.log('Location tracking failed:', error)
        return undefined
      }
    }

    // Get detailed tracking data
    const getTrackingData = async (): Promise<TrackingData> => {
      const location = await getLocationData()
      
      return {
        timestamp: new Date().toISOString(),
        page: pathname,
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer || 'Direct',
        location,
        sessionId,
        previousPage: previousPage || 'First Visit',
        visitDuration: Date.now() - visitStartTime
      }
    }

    // Send tracking data to Discord
    const sendToDiscord = async (data: TrackingData) => {
      try {
        const embed = {
          title: "🔍 SUHAIB's Tracker - Site Visitor",
          color: 0x00ff00,
          fields: [
            {
              name: "📅 Timestamp",
              value: new Date(data.timestamp).toLocaleString('en-US', {
                timeZone: data.timezone,
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              }),
              inline: true
            },
            {
              name: "🌐 Page Visited",
              value: `\`${data.page}\``,
              inline: true
            },
            {
              name: "🆔 Session ID",
              value: `\`${data.sessionId}\``,
              inline: true
            },
            {
              name: "📍 Location",
              value: data.location 
                ? `${data.location.city || 'Unknown'}, ${data.location.region || 'Unknown'}, ${data.location.country || 'Unknown'}`
                : 'Location unavailable',
              inline: true
            },
            {
              name: "🌍 Coordinates",
              value: data.location?.latitude && data.location?.longitude
                ? `[${data.location.latitude.toFixed(4)}, ${data.location.longitude.toFixed(4)}](https://www.google.com/maps?q=${data.location.latitude},${data.location.longitude})`
                : 'Not available',
              inline: true
            },
            {
              name: "🏢 ISP",
              value: data.location?.isp || 'Unknown',
              inline: true
            },
            {
              name: "💻 Device Info",
              value: `Screen: ${data.screenResolution}\nLanguage: ${data.language}\nTimezone: ${data.timezone}`,
              inline: false
            },
            {
              name: "🔗 Referrer",
              value: data.referrer,
              inline: true
            },
            {
              name: "⏱️ Visit Duration",
              value: `${Math.round(data.visitDuration! / 1000)}s`,
              inline: true
            },
            {
              name: "⬅️ Previous Page",
              value: data.previousPage,
              inline: true
            },
            {
              name: "🖥️ User Agent",
              value: `\`\`\`${data.userAgent.substring(0, 1000)}\`\`\``,
              inline: false
            }
          ],
          footer: {
            text: "SUHAIB's Tracker - Detailed Visitor Analytics",
            icon_url: "https://cdn.discordapp.com/emojis/1234567890123456789.png"
          },
          timestamp: data.timestamp
        }

        await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: "SUHAIB's Tracker",
            avatar_url: "https://cdn.discordapp.com/emojis/1234567890123456789.png",
            embeds: [embed]
          })
        })

        console.log('✅ Tracking data sent to Discord successfully')
      } catch (error) {
        console.error('❌ Failed to send tracking data to Discord:', error)
      }
    }

    // Track page visit
    const trackVisit = async () => {
      const trackingData = await getTrackingData()
      await sendToDiscord(trackingData)
    }

    // Track immediately on page load
    trackVisit()

    // Track when user leaves the page
    const handleBeforeUnload = () => {
      const finalData: TrackingData = {
        timestamp: new Date().toISOString(),
        page: pathname,
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer || 'Direct',
        sessionId,
        previousPage: previousPage || 'First Visit',
        visitDuration: Date.now() - visitStartTime
      }

      // Send final tracking data
      navigator.sendBeacon(DISCORD_WEBHOOK_URL, JSON.stringify({
        username: "SUHAIB's Tracker - Exit",
        embeds: [{
          title: "🚪 SUHAIB's Tracker - User Exit",
          color: 0xff0000,
          fields: [
            {
              name: "📅 Exit Time",
              value: new Date(finalData.timestamp).toLocaleString(),
              inline: true
            },
            {
              name: "🌐 Last Page",
              value: `\`${finalData.page}\``,
              inline: true
            },
            {
              name: "⏱️ Total Visit Duration",
              value: `${Math.round(finalData.visitDuration! / 1000)}s`,
              inline: true
            },
            {
              name: "🆔 Session ID",
              value: `\`${finalData.sessionId}\``,
              inline: true
            }
          ],
          footer: {
            text: "SUHAIB's Tracker - Exit Analytics"
          },
          timestamp: finalData.timestamp
        }]
      }))
    }

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('pagehide', handleBeforeUnload)

    // Update previous page for next visit
    setPreviousPage(pathname)

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('pagehide', handleBeforeUnload)
    }
  }, [pathname, sessionId, visitStartTime, previousPage])

  // This component doesn't render anything visible
  return null
}

// Hook for manual tracking
export function useSuhaibTracking() {
  const trackCustomEvent = async (eventName: string, additionalData?: Record<string, any>) => {
    if (typeof window === 'undefined') return

    try {
      const trackingData = {
        timestamp: new Date().toISOString(),
        event: eventName,
        page: window.location.pathname,
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer || 'Direct',
        sessionId: sessionStorage.getItem('suhaib-session-id') || 'unknown',
        additionalData
      }

      const embed = {
        title: `🎯 SUHAIB's Tracker - Custom Event: ${eventName}`,
        color: 0x0099ff,
        fields: [
          {
            name: "📅 Timestamp",
            value: new Date(trackingData.timestamp).toLocaleString(),
            inline: true
          },
          {
            name: "🎯 Event",
            value: `\`${eventName}\``,
            inline: true
          },
          {
            name: "🌐 Page",
            value: `\`${trackingData.page}\``,
            inline: true
          },
          {
            name: "🆔 Session ID",
            value: `\`${trackingData.sessionId}\``,
            inline: true
          },
          ...(additionalData ? Object.entries(additionalData).map(([key, value]) => ({
            name: `📊 ${key}`,
            value: String(value),
            inline: true
          })) : [])
        ],
        footer: {
          text: "SUHAIB's Tracker - Custom Event"
        },
        timestamp: trackingData.timestamp
      }

      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: "SUHAIB's Tracker",
          embeds: [embed]
        })
      })

      console.log(`✅ Custom event "${eventName}" tracked successfully`)
    } catch (error) {
      console.error(`❌ Failed to track custom event "${eventName}":`, error)
    }
  }

  return { trackCustomEvent }
}
