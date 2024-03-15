import "../stylesheets/termsConditions.css";
import caret from "../../assets/terms/back-caret.svg";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
    return (
        <>
            <div className="terms-conditions">
            <Link to={"/register"}>
                <div className="go-back">
                    <img src={caret} height="18px"></img>
                    Go back
                </div>
            </Link>
            <h1>Privacy Policy for Post-i-tivity</h1>
            <p>Effective date: 22/02/2024<br/>
            ExceptionHandler ("us", "we", or "our") operates the Post-i-tivity mobile application (here in after referred to as the "Service").
            This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
            </p>
            <h2>1. Information Collection and Use</h2>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            <h3>Types of Data Collected</h3>
            <h4>Personal Data</h4>
            <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>
            <ul>
                <li>Email address</li>
                <li>Location data</li>
                <li>Cookies and Usage Data</li>
            </ul>
            <p>When you access the Service by or through a mobile device, we may collect certain information automatically, including, but not limited to, the type of mobile device you use, your mobile device's unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data ("Usage Data").</p>
            <h2>2. Use of Data</h2>
            <p>ExceptionHandler uses the collected data for various purposes:</p>
            <ul>
                <li>To provide and maintain the Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer care and support</li>
                <li>To provide analysis or valuable information so that we can improve the Service</li>
                <li>To monitor the usage of the Service</li>
                <li>To detect, prevent and address technical issues</li>
            </ul>
            <h2>3. Transfer of Data</h2>
            <p>
                Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.<br/>
                Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.<br/>
                ExceptionHandler will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.

            </p>
            <h2>4. Disclosure of Data</h2>
            <h4>Legal Requirements</h4>
            <p>ExceptionHandler may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
            <ul>
                <li>To comply with a legal obligation</li>
                <li>To protect and defend the rights or property of Exception Handler</li>
                <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                <li>To protect the personal safety of users of the Service or the public</li>
                <li>To protect against legal liability</li>
            </ul>
            <h2>5. Security of Your Information</h2>
            <p>We value your trust in providing us with your Personal Information, thus we strive to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>
            <h2>6. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. These changes are effective immediately after they are posted on this page.</p>

            <h2>Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at rb901@exeter.ac.uk.</p>
            </div>
        </>
    );
}
 
export default PrivacyPolicy;