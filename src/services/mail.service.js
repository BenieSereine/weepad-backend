import MailGen from 'mailgen';
import sgMail from '@sendgrid/mail';

/**
 * this is a service dealing with sending email to the user
 */
class MailService {
	/**
	 * @param {object} name
	 * @param {object} email
	 * @param {object} token
	 * @returns {object} send an email to a user via email
	*/
	static sendEMail(name, email, token) {
		const emailToSend = {
			body: {
				name,
				intro: 'You requested to reset your password.',
				action: {
					instructions:
			'Please click the button below to reset your password',
					button: {
						color: '#33b5e5',
						text: 'Reset your password',
						link: `${process.env.BASE_URL}/api/auth/resetpassword?token=${token}`,
					},
				},
			},
		};
		const mailGenerator = new MailGen({
			theme: 'salted',
			product: {
				name: 'WePad',
				link: `${process.env.BASE_URL}/api/auth/resetpassword?token=${token}`,
			},
		});
		const emailTemplate = mailGenerator.generate(emailToSend);
		require('fs').writeFileSync('preview.html', emailTemplate, 'utf8');
		const msg = {
			to: email,
			from: 'BMugwaneza720@daviscollege.com',
			subject: 'Reset Password',
			text: 'reset the password',
			html: emailTemplate,
		};
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		sgMail
			.send(msg);
	}
}

export default MailService;
