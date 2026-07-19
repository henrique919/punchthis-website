import LegalLayout from '../components/LegalLayout'
import { LAST_UPDATED, RETENTION_DELETION, NO_ACCOUNTS, EXPORT_SHARING } from '../config/legalContent'

const SECTIONS = [
  {
    title: 'There is no account to delete',
    body: NO_ACCOUNTS,
  },
  {
    title: 'Deleting data on your device',
    body: RETENTION_DELETION,
  },
  {
    title: 'Copies you already shared',
    body: EXPORT_SHARING,
  },
  {
    title: 'Need help with deletion?',
    body: "If you're not able to access the app to clear your data yourself — for example a lost or reset device — contact support and we'll help you understand your options. Because PunchThis has no server-side account or backup, there's no remote record for us to delete beyond what's already described above.",
  },
]

export default function DataDeletion() {
  return (
    <LegalLayout
      eyebrow="DATA DELETION"
      title="Deleting your data"
      intro="PunchThis is local-first, so deleting your data is something you do on your device — not a request you send us."
      updated={LAST_UPDATED}
      sections={SECTIONS}
      path="/data-deletion"
    />
  )
}
