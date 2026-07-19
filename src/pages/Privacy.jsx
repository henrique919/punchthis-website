import LegalLayout from '../components/LegalLayout'
import {
  LAST_UPDATED,
  PRODUCT_SCOPE,
  LOCAL_STORAGE_WARNING,
  CAMERA_PHOTOS,
  BLUR_REDACTION,
  RETENTION_DELETION,
  EXPORT_SHARING,
  NO_ACCOUNTS,
} from '../config/legalContent'

const SECTIONS = [
  { title: 'Product scope', body: PRODUCT_SCOPE },
  { title: 'Accounts', body: NO_ACCOUNTS },
  { title: 'Local storage', body: LOCAL_STORAGE_WARNING },
  { title: 'Camera & photos', body: CAMERA_PHOTOS },
  { title: 'Blur & redaction', body: BLUR_REDACTION },
  { title: 'Retention & deletion', body: RETENTION_DELETION },
  { title: 'Exporting & sharing', body: EXPORT_SHARING },
]

export default function Privacy() {
  return (
    <LegalLayout
      eyebrow="PRIVACY"
      title="Privacy policy"
      intro="What PunchThis stores, where it lives, and what happens when you delete it."
      updated={LAST_UPDATED}
      sections={SECTIONS}
      path="/privacy"
    />
  )
}
