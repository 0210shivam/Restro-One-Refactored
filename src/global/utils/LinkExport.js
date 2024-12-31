import Instagram from '../../../public/insta.png'
import Facebook from '../../../public/facebook.png'
import Maps from '../../../public/google-maps.png'
import Google from '../../../public/google.png'
import Youtube from '../../../public/youtube.png'
import Whatsapp from '../../../public/whatsapp.png'
import Messanger from '../../../public/messanger.webp'
const domainURL = "https://reviews.magicqr.in";

const SocialLinks = [
   { type: 'Social', page_title: 'Instagram', placeholder: 'https://www.instagram.com/username', image: Instagram },
   { type: 'Social', page_title: 'Facebook', placeholder: 'https://www.facebook.com/username', image: domainURL + '/assets/images/fb.jpeg' },
   { type: 'Social', page_title: 'Twitter', placeholder: 'https://x.com/uesrname', image: Facebook },
   { type: 'Social', page_title: 'Reviews', placeholder: 'https://search.google.com/local/writereview?placeid=[YOUR_PLACEID]', image: Google },
   { type: 'Social', page_title: 'Maps', placeholder: 'https://www.google.com/maps/place/your_address', image: Maps },
   { type: 'Social', page_title: 'Whatsapp', placeholder: 'http://api.whatsapp.com/send/?phone={phone}', image: Whatsapp },
   { type: 'Social', page_title: 'Youtube', placeholder: 'https://www.youtube.com/@username', image: Youtube },

   { type: 'Social', page_title: 'Messenger', placeholder: 'https://messenger.com/uesrname', image: Messanger },

   { type: 'Social', page_title: 'LinkedIn', placeholder: 'http://linkedin.com/in/username', image: domainURL + '/assets/images/linkedin.png' },
   { type: 'Social', page_title: 'Gmail', placeholder: 'example@gmail.com', image: domainURL + '/assets/images/mail.webp' },

   { type: 'Social', page_title: 'Discord', placeholder: 'https://discord.gg/[invite-code]', image: domainURL + '/assets/images/discord.png' },
   { type: 'Social', page_title: 'Indeed', placeholder: 'https://www.indeed.com/cmp/yourpage/reviews', image: domainURL + '/assets/images/indeed.png' },
]

export default SocialLinks;