import { useNavigate, useParams } from "react-router"
import { Button } from "@/components/ui/button"
import { useContext, useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { AuthContext } from "@/components/AuthContext"
import { formatDate } from "@/lib/utils"

export const Email = () => {
  const { emailCategory, emailId } = useParams()
  const navigate = useNavigate()
  const [email, setEmail] = useState({})
  const [loading, setLoading] = useState(true)
  const { user } = useContext(AuthContext)

  const deleteEmail = async () => {
    // TODO: delete email by <emailId>, redirect to the inbox page
  }

  const reply = () => {
    navigate("/compose", {
      state: {
        recipients: [email.sender, ...email.recipients]
          .filter((r) => r.email !== user.email)
          .map((r) => r.email)
          .join(","),
        subject: `Re: ${email.subject}`,
        body: `\n\n----\non ${formatDate(email.sentAt)}, ${
          email.sender.email
        } wrote:\n\n${email.body}`
      }
    })
  }

  const toggleArchive = async () => {
    // TODO: toggle the email archive status to true/false
  }

  const formatTextWithNewlines = (text) => {
    return text?.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ))
  }

  useEffect(() => {
    // TODO: get email by <emailId>, fill the email state and change loading to false
  }, [emailId])

  if (loading) {
    return null
  }

  return (
    <div>
      <div>
        <h2 className="font-medium text-3xl">
          {/* TODO: show email subject */}
        </h2>
        <Badge className="my-4">
          {/* TODO: show email category */}
        </Badge>
        <ul className="pb-4 border-b flex flex-col gap-2">
          <li>
            <span className="font-bold">From:</span>{" "}
            <span>
              {/* TODO: show email sender */}
            </span>
          </li>
          <li>
            <span className="font-bold">To:</span>{" "}
            <span>{email.recipients.map((r) => r.email).join(", ")}</span>
          </li>
          <li>
            <span>
              {/* TODO: show email sent date */}
            </span>
          </li>
        </ul>
        <p className="my-4">{formatTextWithNewlines(email.body)}</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={reply} variant="outline">
          Reply
        </Button>
        {emailCategory !== "sent" && (
          // TODO: call toggleArchive function on click
          <Button onClick={toggleArchive} variant="outline">
            {/* TODO: show "Unarchive" or "Archive" text based on current archived status */}
          </Button>
        )}
        <Button onClick={deleteEmail} variant="outlineDestructive">
          Delete
        </Button>
      </div>
    </div>
  )
}
