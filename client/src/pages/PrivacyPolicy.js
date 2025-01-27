import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LOGO from "../assets/logo-navbar.png";
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';


export default function PrivacyPolicy(){
    const [showToTopButton, setShowToTopButton] = useState(false);
    const sectionRef = useRef(null);
    const scrollToSection = (sectionId) => {
        const sectionRef = document.getElementById(sectionId);
        if (sectionRef) {
            const headerOffset = 90; // Adjust the offset as needed
            const elementPosition = sectionRef.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowToTopButton(true);
      } else {
        setShowToTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    return(
        <div className="bg-backgroundColor h-full w-screen mt-20" id="top">
            {/* <div className="bg-[#3B82F6] h-16 w-screen px-6 flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                    <img src={LOGO} className="h-8 w-8 ml-6 mr-3" alt="BRICS Logo" />
                    <Link to="/" className="text-white tracking-wide text-xl font-bold">BRICS</Link>
                </div>
            </div> */}
            <Navbar />
          <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-4 font-satoshi-bold text-[#3B82F6]">Website Privacy Policy for BRICS</h1>
            <p className="text-gray-700 mb-4 font-satoshi-regular">
                LAST UPDATE: May 5, 2024
            </p>
            <p className="text-gray-700 mb-4 font-satoshi-regular">
                This is the Privacy Policy (“Policy”) for BRICS. We are committed to comply the Philippine Data Privacy Act of 2012 (DPA) and the privacy notice outlined by the <b className="text-blue-500"><a href="https://uplb.edu.ph/privacy-policy-2/">University of the Philippines Los Baños</a></b>. This Privacy Policy describes the how we may collect, use, share or otherwise process personal information, particularly in association with our system development practices and the operation of our website, email correspondence, and any of our social media channels (collectively, our “Platforms”), and in connection with any of our reservation system, features, events, video training, or tools (collectively, our “system”).
            </p>
            <p className="text-gray-700 mb-4 font-satoshi-regular font-bold">
                Please note that this Policy only pertains to our Platform and the information and/or functionalities offered on the Platform.  
            </p>
            <p className="text-gray-700 mb-4 font-satoshi-regular">
                This Policy describes:
            </p>
            <p className="text-gray-700 mb-4 font-satoshi-bold">
                <ul>
                    <a
                        href="#choice-a"
                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                    onClick={(e) => {
                        e.preventDefault();
                        const targetId = e.currentTarget.getAttribute('href');
                        const targetElement = document.querySelector(targetId);
                        
                        const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 90;

                        window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                        });
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}
                    > A. The Types of Information We Collect</a><br/><br/>
                    <a
                        href="#choice-b"
                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                    onClick={(e) => {
                        e.preventDefault();
                        const targetId = e.currentTarget.getAttribute('href');
                        const targetElement = document.querySelector(targetId);
                        
                        const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 90;

                        window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                        });
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}
                    > B. How We Use the Information We Collect</a><br/><br/>
                    <a
                    href="#choice-c"
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                    onClick={(e) => {
                        e.preventDefault();
                        const targetId = e.currentTarget.getAttribute('href');
                        const targetElement = document.querySelector(targetId);
                        
                        const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 90;

                        window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                        });
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}
                    >
                    C. How We May Share the Information We Collect
                    </a><br/><br/>
                    <a
                        href="#choice-d"
                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                    onClick={(e) => {
                        e.preventDefault();
                        const targetId = e.currentTarget.getAttribute('href');
                        const targetElement = document.querySelector(targetId);
                        
                        const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 90;

                        window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                        });
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}
                    > D. Third-Party Services and Content</a><br/><br/>
                    <a
                        href="#choice-e"
                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                    onClick={(e) => {
                        e.preventDefault();
                        const targetId = e.currentTarget.getAttribute('href');
                        const targetElement = document.querySelector(targetId);
                        
                        const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 90;

                        window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                        });
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}
                    > E. Protection and Storage of the Information We Collect</a><br/><br/>
                    <a
                        href="#choice-f"
                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                    onClick={(e) => {
                        e.preventDefault();
                        const targetId = e.currentTarget.getAttribute('href');
                        const targetElement = document.querySelector(targetId);
                        
                        const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 90;

                        window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                        });
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}
                    > F. Your Choices and Rights</a><br/><br/>
                    <a
                        href="#choice-g"
                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                    onClick={(e) => {
                        e.preventDefault();
                        const targetId = e.currentTarget.getAttribute('href');
                        const targetElement = document.querySelector(targetId);
                        
                        const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 90;

                        window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                        });
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}
                    > G. How to Contact Us</a><br/><br/>
                    <a
                        href="#choice-h"
                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                    onClick={(e) => {
                        e.preventDefault();
                        const targetId = e.currentTarget.getAttribute('href');
                        const targetElement = document.querySelector(targetId);
                        
                        const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 90;

                        window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                        });
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}
                    > H. Changes to This Policy</a><br/><br/>             
            </ul>
            </p>
            <p className="text-gray-700 mb-4 font-satoshi-bold" id="choice-a">
                A.	THE TYPES OF INFORMATION WE COLLECT
            </p>
            <p className="text-gray-700 mb-4 font-satoshi-regular">
                We collect your personal information when you provide it to us. <b>“Personal information”</b> is any information that can be used to identify you or that we can link to you. We may automatically collect certain information when you use, access, or interact with our Platforms. And we may collect information from other sources, such as social media platforms that may share information about how you interact with our social media content.
            </p>
            <p className="text-gray-700 mb-4 font-satoshi-regular">
                <b>1.	Information you provide to us. </b>  We collect information that you provide to us, including when you communicate with us via email or other channels, including social media; when you sign up for or request that we send you notifications, alerts, or other materials; when you sign up for an account; when you respond to our communications or requests for information; when you book or reserve any of the rooms in the Institute of Computer Science, UPLB; when you provide file or image access. The information you provide may include your name, your organization name, contact information, title, email address, and other information about yourself or your affiliation.  Some of our Platforms may require that you enter a password or other information in order to access certain features, and we collect such credentials when you enter them.  If you reserve a room, we will also collect proof of payment and reference number.  We may also collect information if you provide it to us through the use of forms that you download from our Platforms, complete and send in to us.
            </p>
            <p className="text-gray-700 mb-4 font-satoshi-regular">
                <b>3.	Information we collect from other sources. </b>  We may receive information about you from other sources, including third parties that help us: update, expand, and analyze our records; identify new customers; or prevent or detect fraud. We may also receive information about you from social media platforms including but not limited to when you interact with us on those platforms or access our social media content. The information we may receive is governed by the privacy settings, policies, and/or procedures of the applicable social media platform, and we encourage you to review them.            
            </p>
            <p className="text-gray-700 mb-4 font-satoshi-bold" id="choice-b">
                B.	HOW WE USE THE INFORMATION WE COLLECT            
            </p>
            <ol className="list-decimal list-inside text-gray-700 mb-4 font-satoshi-regular ml-9">
                <li>To aggregate information about you from multiple sources;</li><br/>
                <li>To respond to your inquiries;</li><br/>
                <li>To provide you with inquiries that you request;</li><br/>
                <li>To process payment for any reservations that you made;</li><br/>
                <li>To operate, troubleshoot, and improve the Platforms;</li><br/>
                <li>To send you notofications, updates, and other information that may help you;</li><br/>
                <li>To maintain our list of users;</li><br/>
                <li>For system's report purposes, including data analysis; report generation; detecting, preventing, and responding to actual or potential fraud, illegal activities, or intellectual property infringement;</li><br/>
                <li>As we believe reasonably necessary or appropriate to: comply with our legal obligations; respond to legal process or requests for information issued by government authorities or other third parties; or protector your, our, or others' rights;</li><br/>
                <li>In another way that we indicate when we collect it; and</li><br/>
                <li>Any other manner that you give us permission to do.</li><br/>
            </ol>

            <p className="text-gray-700 mb-4 font-satoshi-bold" id="choice-c">
                C. HOW WE MAY SHARE THE INFORMATION WE COLLECT
            </p>
            <ol className="text-gray-700 list-decimal list-inside mb-4 font-satoshi-regular">
                <li>We may share your information in a number of ways and circumstances. We may share your information in any way that we indicate at the time we collect it. We may share information with the developers, administrators, ICS faculty and staff, alliance partners for systematic purposes such as internal administration, billing, information technology services, support and maintenance, approving reservations, and any of the actions that we have indicated anywhere in this Policy that we may take with regards to data and information. We may also share the information we collect in other ways if you give us consent to those other ways.</li><br/>
                <li>We do not sell, rent, or otherwise share information that reasonably identifies you with unaffiliated entities for their independent use except as expressly described in this Policy or with your prior permission. We may share information that does not reasonably identify you as permitted by applicable law.</li><br/>
                <li>We may also disclose information we collect:<br/>
                    <ol className="text-gray-700 list-decimal list-inside mb-4 font-satoshi-regular ml-9">
                        <br/><li>To our third-party service providers that perform services on our behalf, such as web-hosting companies, mailing vendors, analytics providers, and information technology providers.</li><br/>
                        <li>To law enforcement, other government authorities, or third parties (within or outside the jurisdiction in which you reside) as may be permitted or required by the laws of any jurisdiction that may apply to us; as provided for under contract; or as we deem reasonably necessary to provide you services. In these circumstances, we take reasonable efforts to notify you before we disclose information that may reasonably identify you, unless prior notice is prohibited by applicable law or is not possible or reasonable in the circumstances.</li><br/>
                    </ol>
                </li>
                <li>We may share anonymous, de-identified, or aggregate information that cannot reasonably identify you with others for any purpose, as permitted by applicable law. </li><br/>
                <li><b>Grounds for using or processing your personal information.</b> We rely on the following legal grounds to process your personal information, namely:
                    <ol className="text-gray-700 list-decimal list-inside mb-4 font-satoshi-regular ml-9">
                    <br/><li><b>Consent.</b> By using our Platforms, you consent to our use of your personal information as described in this Policy. If you object to such use, please cease all uses of the Platforms. We may use precise location information as described in this Policy. You may be able to disable the sharing of location information in your browser or mobile application settings.</li>
                    <br/><li><b>Legitimate interests.</b> We may use your personal information for our legitimate interests to improve our system and the content on our Platforms. Consistent with our legitimate interests and any choices that we offer or consents that may be required under applicable laws, we may use technical information as described in this Policy and use personal information for our administrative purposes.</li>
                    </ol>
                </li>
            </ol>
            <br/>
            <p className="text-gray-700 mb-4 font-satoshi-bold" id="choice-d">
                D.	THIRD-PARTY SERVICES AND CONTENT            
            </p>
            <p className="text-gray-700 mb-4 font-satoshi-regular">
                Our Platforms may include integrated content or links to content provided by third parties. This Policy does not address the privacy, security, or other practices of the third parties that provide such content.  We may engage third parties that support the operation of our Platforms, such as email providers. These third parties may use technologies to track your online activities over time and across different websites and online platforms. Please see above for how we use Cookies.            
            </p>
            <p className="text-gray-700 mb-4 font-satoshi-bold" id="choice-e">
                E.	PROTECTION AND STORAGE OF THE INFORMATION WE COLLECT
            </p>
            <ol className="text-gray-700 list-decimal list-inside mb-4 font-satoshi-regular">
                <li><b>Legal Precautions.</b>  We take reasonable precautions to comply with applicable legal requirements and safeguard the information that we collect.  However, no information system can be 100% secure.  So, we cannot guarantee the absolute security of your information. Moreover, we are not responsible for the security of information you transmit to us over networks that we do not control, including the Internet, telephone and wireless networks, or even the information technology infrastructure of any of our vendors.</li><br/>
                <li><b>Location. </b>  The system is controlled and operated by the admin and staff of the Institute of Computer Science, College of Arts and Science, UPLB from Los Banos, Laguna, in the Philippines.  We do not intentionally provide our services to the people or organization outside the University of the Philippines.   We do not intentionally market our services outside of the United States.  If you are a non-UP student or organization, we make no representation as to whether our privacy practices comply with your origin. If you use or visit the webiste from outside the premise, you consent to the collection and/or processing in ICS of information we collect from or about you.</li><br/>
                <li><b>Children.</b>  We do not knowingly collect information from children under the age of thirteen (13), and our Platforms are not targeted to children under the age of thirteen (13).<br/></li>
            </ol>
            <br/>
            <p className="text-gray-700 mb-4 font-satoshi-bold" id="choice-f">
                F.	YOUR CHOICES AND RIGHTS            
            </p>
            <ol className="text-gray-700 list-decimal list-inside mb-4 font-satoshi-regular">
                <li>If you no longer wish to receive communications from us, you can let us know by sending us an email via our contact information provided on the footer of this website. Please note that if you opt-out of communications, we may still contact you such as those about ongoing relations or administrative messages.</li><br/>
                <li>Subject to local law, you may have certain rights regarding information that we have collected and that is related to you. We encourage you to contact us to update or correct your information if it changes or if you believe that any information that we have collected about you is inaccurate. You can also ask us to see what personal information we hold about you, to erase your personal information and you may tell us if you object to our use of your personal information. In some jurisdictions, you may have a right to complain to your local data protection authority. If you would like to discuss or exercise the rights you may have, send us an email via our contact information.</li><br/>
            </ol>
            <p className="text-gray-700 mb-4 font-satoshi-bold" id="choice-g">
                G.	HOW TO CONTACT US            
            </p>
            <p className="text-gray-700 mb-4 font-satoshi-regular">
                We welcome your inquiries and comments. But please note that if you are not a verified user, we may not be able to treat the information you send us as confidential or privileged. If you wish to contact us regarding our system, please contact us directly at contact email address or by mail at <i>ics.uplb@up.edu.ph</i> or <i>thebestreservationics@gmail.com</i>         
            </p>
            <br/>
            <p className="text-gray-700 mb-4 font-satoshi-bold" id="choice-h">
                H.	CHANGES TO THIS PRIVACY POLICY            
            </p>
            <p className="text-gray-700 mb-4 font-satoshi-regular">
                We may update this Policy from time to time. The effective date of the current Policy is noted at the top of this page. We encourage you to periodically review this page. If we make any material changes in the way we collect, use, and/or share the personal information that you have provided, we will notify you by posting notice of the changes through various communications.            </p>
            
            {/*go back to home */}
            <br/><br/>
            <a
                href="/"
                className="text-blue-500 font-bold font-satoshi-regular"
            > Go back to home page</a><br/><br/>
            
        </div>
        <div className={`fixed bottom-16 right-16 ${showToTopButton ? '' : 'hidden'}`}>
          <button className="bg-brics-blue hover:bg-[white] float-right rounded-full p-3 m-5 shadow-lg"
                  onClick={() => scrollToSection('top')}>
          <svg className="text-white size-10 lucide lucide-arrow-up-to-line hover:text-brics-blue" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h14"/><path d="m18 13-6-6-6 6"/><path d="M12 7v14"/></svg>
          </button>
        </div>
        <Footer />
        </div>
    );
}