import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export const EmailList = ({ emailCategory }) => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteEmail = async (id) => {
    // TODO: delete email by id, redirect to the inbox page
  };

  useEffect(() => {
    // TODO: get emails by <emailCategory>, fill emails state & change loading to false
  }, [emailCategory]);

  return (
    <div className="my-4 divide-y">
      {loading ? (
        <div className="flex flex-col gap-4">
          <div className="py-3">
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="py-3">
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ) : emails.length === 0 ? (
        <h2 className="my-6">No emails</h2>
      ) : (
        emails.map((email) => (
          <div className="py-3 gap-4" key={email._id}>
            <div className="flex gap-4 items-center">
              {/* TODO: make this link navigate to the specific email page */}
              <Link className="flex justify-between grow gap-4">
                <div className="font-medium hidden md:block">
                  {/* TODO: show email sender */}
                </div>
                <div className="">{email.subject}</div>
                <div className="hidden md:block">
                  {/* TODO: show formatted sent date */}
                </div>
              </Link>
              <div>
                {/* TODO: call deleteEmail function on button click */}
                <Button
                  className="p-2 flex items-center h-auto"
                  variant="outlineDestructive"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
