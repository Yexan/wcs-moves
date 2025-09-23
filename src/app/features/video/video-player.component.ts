import { Component, inject, Input } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-video-player',
  imports: [],
  template: `
    @if (videoId) {
      <div class="youtube-player">
        <iframe
          [src]="safeEmbedUrl"
          [title]="title"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    }
  `,
  styles: `
    .youtube-player
      position: relative
      width: 100%
      height: 0
      padding-bottom: 56.25% // 16:9 aspect ratio
      margin: 1rem 0

      iframe
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        border-radius: 0.5rem
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
  `
})
export class VideoPlayerComponent {
  private sanitizer = inject(DomSanitizer)

  @Input({ required: true }) videoId!: string
  @Input() title: string = 'Vidéo YouTube'

  get safeEmbedUrl(): SafeResourceUrl {
    const cleanId = this.extractVideoId(this.videoId)
    const embedUrl = `https://www.youtube.com/embed/${cleanId}`
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl)
  }

  private extractVideoId(url: string): string {
    const videoUrl = url.trim()
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
      /(?:youtu\.be\/)([^&\n?#]+)/,
      /(?:youtube\.com\/embed\/)([^&\n?#]+)/
    ]

    for (const pattern of patterns) {
      const match = videoUrl.match(pattern)
      if (match) return match[1]
    }

    return videoUrl
  }
}
