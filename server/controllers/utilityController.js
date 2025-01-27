const OTP = require('../models/OTP');
const otpGenerator = require("otp-generator");

/* Import from mailSender utilities */
const { sendEmail } = require('../utilities/mailSender')

const sendOtp = async (req, res) => {
	try {
		const { email } = req.body;

        let otp;
        let result;
        
        //loop for generating unique OTPs
        do {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            console.log("Result is Generate OTP Func");
		    console.log("OTP", otp); 

            result = await OTP.findOne({ otp: otp });
        } while (result);

        //creates a new OTP object to db
		const otpPayload = { email, otp };
		const otpBody = new OTP(otpPayload);
        await otpBody.save();
        console.log("New OTP object saved to database");

        //send OTP via email
        try {
            const mailResponse = await sendEmail(
                email,
                "BRICS Verification Email",
                `<h2>Please confirm your OTP </h2>
                 <p> here is your OTP code:-> ${otp} </p>
                `
            )
            console.log("Email sent successfully: ", mailResponse);
        } catch (error) {
            console.log("Error occurred while sending email: ", error);
            throw error;
        }

		console.log("OTP Body", otpBody);
		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
};

const sendAccountRejection = async (req, res) => {
    try {
        const { email, rejectionReasons, rejectionResolutions, customReason } = req.body;

        // Sending rejection via email
        try {
            let customMessage = "";
            if (customReason != ""){
                customMessage += `
                    <p> Other Reason/s: </p>
                    <p>&emsp;${customReason}
                    </pre>
                `;
            }

            let mailContent = `
                <h1 style="color: #0E79FB;">Account Registration Declined</h1>
                <h4><b> We regret to inform you that your request to register an account has been declined. </b></h4>
                <p> We apologize for any inconvenience that this may cause. <b>Here are the reasons why your request was unaccepted: </b></p>

                <ul>
                    ${rejectionReasons.map(reason => `<li>${reason}</li>`).join('')}
                </ul>

                ${customMessage}

                <p><b> Here are some possible fixes to the mentioned issues: </b></p>
                <ul>
                    ${rejectionResolutions.map(resolution => `<li>${resolution}</li>`).join('')}
                </ul>

                <p> Please note that you are welcome to submit a new account registration request by signing up <b><a href="https://www.facebook.com/signup">here</a>.</b></p>
                <p> If you have any questions or need further assistance, please feel free to contact us. </p>

                <p> Thank you for your kind understanding. </p>

                <br />
                
                <p>Best regards,</p>
                <br>
                <h3><b>BRICS Team</b></h3>
            `;
            

            const mailResponse = await sendEmail(
                email,
                "BRICS Account Rejection",
                mailContent
            );

            console.log("Email sent successfully: ", mailResponse);
        } catch (error) {
            console.log("Error occurred while sending email: ", error);
            throw error;
        }

        res.status(200).json({
            success: true,
            message: `Rejection email sent successfully`
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "error.message" });
    }
};

module.exports = {
    sendOtp,
    sendAccountRejection
};
