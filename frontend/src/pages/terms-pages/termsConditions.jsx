import "../stylesheets/termsConditions.css";
import caret from "../../assets/terms/back-caret.svg";
import { Link } from "react-router-dom";

const TermsConditions = () => {
    return (
        <>
            <div className="terms-conditions">
                <Link to={"/register"}>
                    <div className="go-back">
                        <img src={caret} height="18px"></img>
                        Go back
                    </div>
                </Link>
                <h1>Terms and Conditions for Post-i-tivity</h1>
                <p>Last updated: 22/02/2024 <br/>
                    Welcome to Post-i-tivity! These Terms and Conditions outline the rules and regulations for the use of  Post-i-tivity's mobile application and website (if applicable).
                    By accessing this app, we assume you accept these terms and conditions. Do not continue to use Post-i-tivity if you do not agree to take all of the terms and conditions stated on this page.
                </p>
                <h2>
                    1. Definitions
                </h2>
                <p>
                    For the purposes of these Terms and Conditions:
                </p>
                <ul>
                    <li>"App" refers to Post-i-tivity.</li>
                    <li>"You" means the individual accessing the App, or the company, or other legal entity on behalf of which such individual is accessing or using the App.</li>
                    <li>"Company" (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Exception Handler</li>
                    <li>"Content" means any audio, video, text, images, or other material you choose to display on this App.</li>
                    <li>"Terms and Conditions" (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the App.</li>
                </ul>
                <h2>2. User Accounts</h2>
                <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our App.</p>
                <h2>3. Use of Service</h2>
                <p>You are granted a limited, non-exclusive, revocable license to access and use the App strictly in accordance with these Terms.</p>
                <h2>4. Intellectual Property</h2>
                <p>The App and its original content (excluding Content provided by You or other users), features, and functionality are and will remain the exclusive property of Exception Handler and its licensors.</p>
                <h2>5. User Content</h2>
                <p>You are responsible for the Content that you post on or through the App, including its legality, reliability, and appropriateness.</p>
                <h2>6. Privacy Policy</h2>
                <p>Please refer to our Privacy Policy for information on how we collect, use, and share your data.</p>
                <h2>7. Termination</h2>
                <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                <h2>8. Limitation of Liability</h2>
                <p>In no event shall Exception Handler, nor any of its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the App.</p>
                <h2>9. Governing Law</h2>
                <p>These Terms shall be governed and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.</p>
                <h2>10. Changes to Terms</h2>
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time.</p>
                <h2>11. Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us at rb901@exeter.ac.uk.</p>
            </div>
        </>
      );
}
 
export default TermsConditions;