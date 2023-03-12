import SvgIcon from './svgIcon'

export default function Social() {
  return (
    <div className="flex space-x-4 justify-center py-3">
      {/* <SvgIcon
        title="Spotify"
        href="https://open.spotify.com/user/zdn2g32khwupb8s82rikmb3no?si=3d0fde9abd0948ac"
      /> */}
      <SvgIcon title="TikTok" href="https://www.tiktok.com/@tbh_jewellery" />
      <SvgIcon
        title="Instagram"
        href="https://www.instagram.com/tbh_jewellery/"
      />
      <SvgIcon
        title="YouTube"
        href="https://www.youtube.com/channel/UCfUqXisYyNzQcRDPxP_SizQ"
      />
      {/* <SvgIcon title="Twitch" href="https://www.twitch.tv/tbh_jewellery" /> */}
    </div>
  )
}
