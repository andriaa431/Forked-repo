import { EmailList } from "@/components/EmailList"
import { useParams } from "react-router"

export const EmailListPage = () => {
  const { emailCategory } = useParams()

  return <EmailList emailCategory={emailCategory.toLowerCase()} />
}
