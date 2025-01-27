const nodemailer = require('nodemailer')

const mailSender = async (email, title, body)=>{
    try {
        //to send email ->  firstly create a Transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,  //-> Host SMTP detail
            port: 465,
            secure: true, // true for 465, false for other ports
                auth:{
                    user: process.env.MAIL_USER,  //-> User's mail for authentication
                    pass: process.env.MAIL_PASS,  //-> User's password for authentication
                }
        }) 

        //now Send e-mails to users
        let info = await transporter.sendMail({
            from: 'BRICS Online Reservation System',
            to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
        })

        console.log("Info is here: ",info)
        return info

    } catch (error) {
        console.log(error.message);
    }
}

// Function to send an email
const sendEmail = async (emailAddress, subject, message) => {
    try {
        const mailResponse = await mailSender(
            emailAddress,
            subject,
            message
        );
        console.log("Email sent successfully: ", mailResponse);
        return mailResponse;
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
};

module.exports = {
    sendEmail
};