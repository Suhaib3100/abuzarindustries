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

    // Get browser geolocation (most accurate) - with user interaction
    const getBrowserLocation = (): Promise<TrackingData['location'] | null> => {
      return new Promise((resolve) => {
        if (!navigator.geolocation) {
          resolve(null)
          return
        }

        // Only request geolocation after user interaction or delay
        const requestLocation = () => {
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
        }

        // Check if permission was already requested in this session
        const permissionKey = 'suhaib-geo-permission-requested'
        const hasRequestedPermission = sessionStorage.getItem(permissionKey)
        
        if (hasRequestedPermission) {
          // Permission already requested in this session, skip
          console.log('🔒 Geolocation permission already requested in this session')
          resolve(null)
          return
        }

        // Mark permission as requested
        sessionStorage.setItem(permissionKey, 'true')

        // Wait for user interaction or 3 seconds delay
        let hasUserInteracted = false
        
        const handleUserInteraction = () => {
          if (!hasUserInteracted) {
            hasUserInteracted = true
            requestLocation()
            // Remove event listeners after first interaction
            document.removeEventListener('click', handleUserInteraction)
            document.removeEventListener('scroll', handleUserInteraction)
            document.removeEventListener('keydown', handleUserInteraction)
          }
        }

        // Add event listeners for user interaction
        document.addEventListener('click', handleUserInteraction, { once: true })
        document.addEventListener('scroll', handleUserInteraction, { once: true })
        document.addEventListener('keydown', handleUserInteraction, { once: true })

        // Fallback: request after 3 seconds if no interaction
        setTimeout(() => {
          if (!hasUserInteracted) {
            hasUserInteracted = true
            requestLocation()
            // Remove event listeners
            document.removeEventListener('click', handleUserInteraction)
            document.removeEventListener('scroll', handleUserInteraction)
            document.removeEventListener('keydown', handleUserInteraction)
          }
        }, 3000)
      })
    }

    // Get IP-based location with multiple services
    const getIPLocation = async (): Promise<TrackingData['location'] | null> => {
      const services = [
        'https://api.ipgeolocation.io/ipgeo?apiKey=7852cb59def9470cbabcc424b9df1f5e',
        'https://ipapi.co/json/',
        'https://ipinfo.io/json',
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
              isp: data.isp,
              accuracy: data.accuracy_radius ? data.accuracy_radius * 1000 : undefined // Convert km to meters
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
          title: isExit ? "🏁 Session Complete - Abuzar Industries" : "🎯 New Visitor - Abuzar Industries",
          description: isExit 
            ? `**Session ended** for visitor from **${data.location?.city || 'Unknown'}, ${data.location?.country || 'Unknown'}**\n*Total time: ${Math.round((data.totalSessionTime || 0) / 1000)}s | Pages: ${data.pagesVisited?.length || 1}*`
            : `**New visitor** from **${data.location?.city || 'Unknown'}, ${data.location?.country || 'Unknown'}**\n*Looking for timber products in Chitradurga*`,
          color: isExit ? 0x8B4513 : 0x228B22, // Brown for exit, Forest green for entry
          thumbnail: {
            url: "https://abuzarindustries.in/images/main-logo-1.png"
          },
          fields: [
            {
              name: "📍 Location Details",
              value: data.location 
                ? `**${data.location.city || 'Unknown'}, ${data.location.region || 'Unknown'}**\n${data.location.country || 'Unknown'}\n[${data.location.latitude?.toFixed(4)}, ${data.location.longitude?.toFixed(4)}](https://www.google.com/maps?q=${data.location.latitude},${data.location.longitude})`
                : 'Location unavailable',
              inline: true
            },
            {
              name: "🎯 Accuracy & ISP",
              value: data.location?.accuracy 
                ? `**Accuracy:** ±${Math.round(data.location.accuracy)}m\n**ISP:** ${data.location.isp || 'Unknown'}`
                : `**Enhanced IP Location**\n**ISP:** ${data.location?.isp || 'Unknown'}`,
              inline: true
            },
            {
              name: "📊 Session Info",
              value: `**ID:** \`${data.sessionId.substring(0, 8)}...\`\n**Time:** ${new Date(data.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}\n**Duration:** ${isExit ? `${Math.round((data.totalSessionTime || 0) / 1000)}s` : 'Active'}`,
              inline: true
            },
            {
              name: "🌐 Pages Visited",
              value: data.pagesVisited?.length 
                ? data.pagesVisited.map(page => `• \`${page}\``).join('\n')
                : `• \`${data.page}\``,
              inline: false
            },
            {
              name: "💻 Device & Browser",
              value: `**Screen:** ${data.screenResolution}\n**Language:** ${data.language}\n**Timezone:** ${data.timezone}`,
              inline: true
            },
            {
              name: "🔗 Traffic Source",
              value: data.referrer === 'Direct' ? '**Direct Visit**' : `**Referrer:** ${data.referrer}`,
              inline: true
            }
          ],
          footer: {
            text: "Abuzar Industries - Best Teak Wood Supplier in Chitradurga | SUHAIB's Tracker",
            icon_url: "https://abuzarindustries.in/images/main-logo-1.png"
          },
          timestamp: data.timestamp
        }

        const response = await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: "Abuzar Industries Tracker",
            avatar_url: "https://abuzarindustries.in/images/main-logo-1.png",
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
          title: "🏁 Session Complete - Abuzar Industries",
          description: `**Session ended** for visitor from **${finalData.location?.city || 'Unknown'}, ${finalData.location?.country || 'Unknown'}**\n*Total time: ${Math.round((finalData.totalSessionTime || 0) / 1000)}s | Pages: ${finalData.pagesVisited?.length || 1}*`,
          color: 0x8B4513, // Brown color for exit
          thumbnail: {
            url: "https://abuzarindustries.in/images/main-logo-1.png"
          },
          fields: [
            {
              name: "📍 Location",
              value: finalData.location 
                ? `**${finalData.location.city || 'Unknown'}, ${finalData.location.region || 'Unknown'}**\n${finalData.location.country || 'Unknown'}`
                : 'Location unavailable',
              inline: true
            },
            {
              name: "📊 Session Summary",
              value: `**ID:** \`${finalData.sessionId.substring(0, 8)}...\`\n**Duration:** ${Math.round((finalData.totalSessionTime || 0) / 1000)}s\n**Last Page:** \`${finalData.page}\``,
              inline: true
            },
            {
              name: "🌐 Pages Visited",
              value: finalData.pagesVisited?.length 
                ? finalData.pagesVisited.map(page => `• \`${page}\``).join('\n')
                : `• \`${finalData.page}\``,
              inline: false
            }
          ],
          footer: {
            text: "Abuzar Industries - Best Teak Wood Supplier in Chitradurga | SUHAIB's Tracker",
            icon_url: "https://abuzarindustries.in/images/main-logo-1.png"
          },
          timestamp: finalData.timestamp
        }

        navigator.sendBeacon(DISCORD_WEBHOOK_URL, JSON.stringify({
          username: "Abuzar Industries Tracker",
          avatar_url: "https://abuzarindustries.in/images/main-logo-1.png",
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
