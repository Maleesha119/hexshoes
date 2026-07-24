import { useEffect, useRef } from 'react'
import './HeroVideo.css'

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const markLoaded = () => video.classList.add('loaded')
    const markFailed = () => console.warn('Hero video failed to load — hex canvas remains visible as fallback.')

    video.addEventListener('loadeddata', markLoaded)
    video.addEventListener('canplay', markLoaded)
    video.addEventListener('error', markFailed)

    return () => {
      video.removeEventListener('loadeddata', markLoaded)
      video.removeEventListener('canplay', markLoaded)
      video.removeEventListener('error', markFailed)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
      poster="https://images.pexels.com/videos/7644257/adult-at-night-athlete-boy-7644257.jpeg?auto=compress&cs=tinysrgb&h=900&fit=crop&w=1600"
      src="https://videos.pexels.com/video-files/7644257/7644257-uhd_2560_1440_24fps.mp4"
    />
  )
}

export default HeroVideo