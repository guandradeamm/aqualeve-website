import * as sgMail from '@sendgrid/mail'
import {NextApiRequest, NextApiResponse}from 'next'

export default async function handler(req, res){
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const {name, email, message} = req.body
    const msg = {
        to: process.env.EMAIL_RECIPIENT,
        from: 'emaildapessoa@gmail.com',
        subject: 'Message'
    }       
}