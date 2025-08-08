import nodemailer from 'nodemailer';


const _sendEmail = async (body) => {
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_NODEMAILER,
                pass: process.env.APP_PASSWORD,
            },
        });
        
        await transporter.sendMail({
            from: `E-commerce ${process.env.EMAIL_NODEMAILER}`,
            ...body
        })
        console.log('email sent', body.to);

    } catch (error) {
        console.log('fail to sent email >>>> ', error.message);
        throw new Error('fail to sent email !!!!!!!! ')
    }

}

export default _sendEmail