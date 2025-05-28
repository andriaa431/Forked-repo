import asyncHandler from "express-async-handler"
import { Email, User } from "../models.js"
import { useState } from "react"
import session from "express-session"

export const createEmail = asyncHandler(async (req, res) => {
  // recipients field is a comma separated email STRING
  // for example: demo@email.com,emmet@email.com
  // (we cal also have a single email without any commas)
  const { recipients, subject, body } = req.body

  const emails = [recipients.split]
  
 
 

  const recipientUsers = await User.find({ email: { $in: emails } })
const ids = recipientUsers.map((Recipient) => {
  {Recipient.id}
})
  
  const email = await Email.create({

    // TODO: save email fields     
    // sender (logged in user id)
    sender: req.user,
    recipients: ids,
    subject, body

    
    // recipients: (recipientUsers BUT only ids, you can use map)
    // subject, body
  })

  await email.save()
  res.status(201).json({ message: "Email sent successfully.", _id: email._id })
})

export const getEmailCategory = asyncHandler(async (req, res) => {
  const { mailbox } = req.params
  let emails

  switch (mailbox) {
    case "inbox":
      // TODO: 
      // find emails that are NOT archived
      Email.archived = false
      // and that have logged in user id in the recipient list (logged in user received email in inbox)
      // then sort by newest emails and populate sender & email fields using .populate method
      
      // emails = 
      
      break
    case "sent":
      // TODO: 
      // find emails that the logged in user sent
      // then sort by newest emails and populate sender & email fields using .populate method
      
      // emails = 
      
      break
    case "archived":
      // TODO: 
      // find emails that ARE archived
      // and that have logged in user id in the recipient list (logged in user received email in inbox)
      // then sort by newest emails and populate sender & email fields using .populate method
      
      // emails = 
       if (archiveEmail){
        const _id = req.params
        
       }

      
      break
    default:
      return res.status(400).json({ error: "Invalid mailbox" })
  }

  res.json(emails)
})

export const getEmail = asyncHandler(async (req, res) => {
  const { emailId } = req.params
  let email

  try {
    email = await Email.findOne({
      _id: emailId,
      // VERY IMPORTANT to check that the email we're getting
      // with <emailId> is in the logged in user's inbox or the logged in user sent it
      // otherwise, it's someone else's email and we shouldn't be able to see it
      $or: [{ recipients: req.user._id }, { sender: req.user._id }]
    }) 
    // TODO: populate sender and recipients ids using.populate method
       
    
  } catch (e) {
    console.log(e.stack)
    res.status(400).json({ message: e.message })
  }

  res.json(email)
})

export const archiveEmail = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { archived } = req.body

  // TODO: find email by <id>, change archived status, save and return it
  
  return res.json()
})

export const deleteEmail = asyncHandler(async (req, res) => {
  const { id } = req.params

  await Email.findOneAndDelete({
    _id: id,
    $or: [{ recipients: req.user._id }, { sender: req.user._id }]
  })
  return res.sendStatus(204)
})
