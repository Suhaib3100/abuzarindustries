"use client"

import { useEffect, useState, useRef } from 'react'
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
    accuracy?: number
  }
  sessionId: string
  visitDuration?: number
  previousPage?: string
  pagesVisited?: string[]
  totalSessionTime?: number
  isNewSession?: boolean
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
  const [pagesVisited, setPagesVisited] = useState<string[]>([])
  const [hasLoggedSession, setHasLoggedSession] = useState(false)
  const [isNewSession, setIsNewSession] = useState(false)
  const sessionStartTime = useRef(Date.now())
  const pageVisitTimes = useRef<Map<string, number>>(new Map())

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Store session ID
    sessionStorage.setItem('suhaib-session-id', sessionId)
    
    // Check if this is a new session - simplified logic
    const existingSession = sessionStorage.getItem('suhaib-session-logged')
    console.log('🔍 Session check:', { existingSession, sessionId })
    
    // Always treat as new session for now to ensure we get logs
    console.log('🆕 Treating as new session for testing')
    setIsNewSession(true)
    if (!existingSession) {
      sessionStorage.setItem('suhaib-session-logged', 'true')
    }

    // Track current page visit
    pageVisitTimes.current.set(pathname, Date.now())
    
    // Add to pages visited if not already there
    setPagesVisited(prev => {
      if (!prev.includes(pathname)) {
        return [...prev, pathname]
      }
      return prev
    })

    // Get location data with multiple sources for better accuracy
    const getLocationData = async (): Promise<TrackingData['location']> => {
      try {
        // First try browser geolocation API (most accurate)
        const browserLocation = await getBrowserLocation()
        if (browserLocation) {
          return browserLocation
        }

        // Fallback to IP-based geolocation with multiple services
        const ipLocation = await getIPLocation()
        return ipLocation || undefined
      } catch (error) {
        console.log('Location tracking failed:', error)
        return undefined
      }
    }

    // Get browser geolocation (most accurate)
    const getBrowserLocation = (): Promise<TrackingData['location'] | null> => {
      return new Promise((resolve) => {
        if (!navigator.geolocation) {
          resolve(null)
          return
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords
              
              // Get address from coordinates using reverse geocoding
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              )
              const data = await response.json()
              
              resolve({
                country: data.countryName,
                region: data.principalSubdivision,
                city: data.city || data.locality,
                latitude: latitude,
                longitude: longitude,
                isp: 'Browser Geolocation',
                accuracy: position.coords.accuracy
              })
            } catch (error) {
              console.log('Reverse geocoding failed:', error)
              resolve({
                country: 'Unknown',
                region: 'Unknown',
                city: 'Unknown',
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                isp: 'Browser Geolocation',
                accuracy: position.coords.accuracy
              })
            }
          },
          (error) => {
            console.log('Browser geolocation failed:', error.message)
            resolve(null)
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 minutes
          }
        )
      })
    }

    // Get IP-based location with multiple services
    const getIPLocation = async (): Promise<TrackingData['location'] | null> => {
      const services = [
        'https://ipapi.co/json/',
        'https://ipinfo.io/json',
        'https://api.ipgeolocation.io/ipgeo?apiKey=free',
        'https://ip-api.com/json/'
      ]

      for (const service of services) {
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 5000)
          
          const response = await fetch(service, { signal: controller.signal })
          clearTimeout(timeoutId)
          const data = await response.json()
          
          // Parse different response formats
          let location: TrackingData['location'] | null = null
          
          if (service.includes('ipapi.co')) {
            location = {
              country: data.country_name,
              region: data.region,
              city: data.city,
              latitude: data.latitude,
              longitude: data.longitude,
              isp: data.org
            }
          } else if (service.includes('ipinfo.io')) {
            const [lat, lon] = data.loc?.split(',') || [null, null]
            location = {
              country: data.country,
              region: data.region,
              city: data.city,
              latitude: lat ? parseFloat(lat) : undefined,
              longitude: lon ? parseFloat(lon) : undefined,
              isp: data.org
            }
          } else if (service.includes('ipgeolocation.io')) {
            location = {
              country: data.country_name,
              region: data.state_prov,
              city: data.city,
              latitude: data.latitude,
              longitude: data.longitude,
              isp: data.isp
            }
          } else if (service.includes('ip-api.com')) {
            location = {
              country: data.country,
              region: data.regionName,
              city: data.city,
              latitude: data.lat,
              longitude: data.lon,
              isp: data.isp
            }
          }
          
          if (location && location.latitude && location.longitude) {
            return location
          }
        } catch (error) {
          console.log(`Location service ${service} failed:`, error)
          continue
        }
      }
      
      return null
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
        visitDuration: Date.now() - visitStartTime,
        pagesVisited: pagesVisited,
        totalSessionTime: Date.now() - sessionStartTime.current,
        isNewSession: isNewSession
      }
    }

    // Send tracking data to Discord
    const sendToDiscord = async (data: TrackingData, isExit = false) => {
      console.log('📤 Sending to Discord webhook:', DISCORD_WEBHOOK_URL)
      try {
        const embed = {
          title: isExit ? "🚪 SUHAIB's Tracker - Session Complete" : "🔍 SUHAIB's Tracker - New Visitor",
          color: isExit ? 0xff6b35 : 0x00ff00,
          fields: [
            {
              name: "📅 Session Start",
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
                ? `[${data.location.latitude.toFixed(6)}, ${data.location.longitude.toFixed(6)}](https://www.google.com/maps?q=${data.location.latitude},${data.location.longitude})`
                : 'Not available',
              inline: true
            },
            {
              name: "🎯 Accuracy",
              value: data.location?.accuracy 
                ? `±${Math.round(data.location.accuracy)}m`
                : 'IP-based (less accurate)',
              inline: true
            },
            {
              name: "🏢 ISP",
              value: data.location?.isp || 'Unknown',
              inline: true
            },
            {
              name: "📊 Pages Visited",
              value: data.pagesVisited?.length ? data.pagesVisited.map(page => `\`${page}\``).join(', ') : `\`${data.page}\``,
              inline: false
            },
            {
              name: "⏱️ Total Session Time",
              value: `${Math.round((data.totalSessionTime || 0) / 1000)}s`,
              inline: true
            },
            {
              name: "🔗 Entry Point",
              value: data.referrer,
              inline: true
            },
            {
              name: "💻 Device Info",
              value: `Screen: ${data.screenResolution}\nLanguage: ${data.language}\nTimezone: ${data.timezone}`,
              inline: false
            },
            {
              name: "🖥️ User Agent",
              value: `\`\`\`${data.userAgent.substring(0, 1000)}\`\`\``,
              inline: false
            }
          ],
          footer: {
            text: isExit ? "SUHAIB's Tracker - Session Analytics" : "SUHAIB's Tracker - New Visitor Analytics",
            icon_url: "https://cdn.discordapp.com/emojis/1234567890123456789.png"
          },
          timestamp: data.timestamp
        }

        const response = await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: isExit ? "SUHAIB's Tracker - Exit" : "SUHAIB's Tracker",
            avatar_url: "https://cdn.discordapp.com/emojis/1234567890123456789.png",
            embeds: [embed]
          })
        })

        console.log('📤 Discord response status:', response.status)
        if (response.ok) {
          console.log(`✅ ${isExit ? 'Exit' : 'Entry'} tracking data sent to Discord successfully`)
        } else {
          console.error('❌ Discord webhook failed:', response.status, response.statusText)
        }
      } catch (error) {
        console.error(`❌ Failed to send ${isExit ? 'exit' : 'entry'} tracking data to Discord:`, error)
      }
    }

    // Track page visit - simplified for testing
    const trackVisit = async () => {
      console.log('🔍 SUHAIB Tracker Debug:', {
        isNewSession,
        hasLoggedSession,
        pathname,
        sessionId
      })
      
      // Always send for testing - remove hasLoggedSession check
      if (isNewSession) {
        console.log('📊 Sending new session tracking data...')
        const trackingData = await getTrackingData()
        console.log('📊 Tracking data prepared:', trackingData)
        await sendToDiscord(trackingData, false)
        setHasLoggedSession(true)
        console.log('✅ Session logged successfully')
      } else {
        console.log('⏭️ Skipping log - not a new session')
      }
    }

    // Track immediately on page load if new session
    trackVisit()

    // Track when user leaves the page
    const handleBeforeUnload = async () => {
      console.log('🚪 User leaving page, hasLoggedSession:', hasLoggedSession)
      if (hasLoggedSession) {
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
          visitDuration: Date.now() - visitStartTime,
          pagesVisited: pagesVisited,
          totalSessionTime: Date.now() - sessionStartTime.current,
          isNewSession: false
        }

        // Send final tracking data using sendBeacon for reliability
        const embed = {
          title: "🚪 SUHAIB's Tracker - Session Complete",
          color: 0xff6b35,
          fields: [
            {
              name: "📅 Session End",
              value: new Date(finalData.timestamp).toLocaleString(),
              inline: true
            },
            {
              name: "🆔 Session ID",
              value: `\`${finalData.sessionId}\``,
              inline: true
            },
            {
              name: "📊 Pages Visited",
              value: finalData.pagesVisited?.length ? finalData.pagesVisited.map(page => `\`${page}\``).join(', ') : `\`${finalData.page}\``,
              inline: false
            },
            {
              name: "⏱️ Total Session Duration",
              value: `${Math.round((finalData.totalSessionTime || 0) / 1000)}s`,
              inline: true
            },
            {
              name: "🌐 Last Page",
              value: `\`${finalData.page}\``,
              inline: true
            }
          ],
          footer: {
            text: "SUHAIB's Tracker - Session Complete"
          },
          timestamp: finalData.timestamp
        }

        navigator.sendBeacon(DISCORD_WEBHOOK_URL, JSON.stringify({
          username: "SUHAIB's Tracker - Exit",
          embeds: [embed]
        }))
      }
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
  }, [pathname, sessionId, visitStartTime, previousPage, pagesVisited, hasLoggedSession, isNewSession])

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
