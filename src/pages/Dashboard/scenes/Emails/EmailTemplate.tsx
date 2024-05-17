// EmailTemplate.tsx
import React from 'react';

interface EmailTemplateProps {
  subject: string;
  body: string;
  recipient: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ subject, body }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <div role="article" aria-roledescription="email" lang="en" style="
            text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            background-color: #ffffff;
          ">
        <div role="article" aria-roledescription="email" lang="en" style="
            text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            background-color: #ffffff;
          ">
        <table role="presentation" style="width: 100%; border: none; border-spacing: 0">
            <tr>
                <td align="center" style="padding: 0">
                    <table role="presentation" style="
                    width: 94%;
                    max-width: 600px;
                    border: none;
                    border-spacing: 0;
                    text-align: left;
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 22px;
                    color: #363636;
                  ">
                        <tr>
                            <td style="
                        padding: 40px 30px 30px 30px;
                        text-align: center;
                        font-size: 24px;
                        font-weight: bold;
                      ">
                                <a href="https://sefglobal.org/" style="text-decoration: none"><img src="https://sefglobal.org/assets/img/brand/logo.png" width="165" style="
                            width: 80%;
                            max-width: 165px;
                            height: auto;
                            border: none;
                            text-decoration: none;
                            color: #ffffff;
                          "/></a>
                            </td>
                        </tr>
                        <tr>
                            <td style="
                        padding: 35px 30px 11px 30px;
                        font-size: 0;
                        background-color: #ffffff;
                        border-bottom: 1px solid #f0f0f5;
                        border-color: rgba(201, 201, 207, 0.35);
                      ">
                                <div class="col-lge" style="
                          display: inline-block;
                          width: 100%;
                          min-width: 100%;
                          vertical-align: top;
                          padding-bottom: 20px;
                          font-family: Arial, sans-serif;
                          font-size: 16px;
                          line-height: 22px;
                          color: #363636;
                        ">
                        <p style="margin-top: 0; margin-bottom: 22px">
                                     ${subject}
                                    </p>
                        <p style="margin-top: 0; margin-bottom: 22px">
                                     Dear ,
                                    </p>
                                    <p style="margin-top: 0; margin-bottom: 22px">
                                        ${body}
                                    </p>
                                    <p style="margin-top: 0; margin-bottom: 18px">
                                        Best regards,<br/>
                                        ScholarX Team,<br/>
                                        Sustainable Education Foundation.
                                    </p>
                                    <p style="margin: 0" th:if="">
                                        <a href="https://scholarx.sefglobal.org/" style="
                              background: #1890ff;
                              text-decoration: none;
                              padding: 10px 25px;
                              color: #ffffff;
                              border-radius: 4px;
                              display: inline-block;
                              mso-padding-alt: 0;
                              text-underline-color: #1890ff;
                            ">
                                            <span style="mso-text-raise: 10pt; font-weight: bold">View Dashboard</span>
                                        </a>
                                        <a href="https://join.slack.com/t/sefheadquarters/shared_invite/zt-1jwub1lpd-RXYAMG46qXRUhOGZ7u_ewg" style="
                              background: #6dca65;
                              text-decoration: none;
                              padding: 10px 25px;
                              color: #ffffff;
                              border-radius: 4px;
                              display: inline-block;
                              mso-padding-alt: 0;
                              text-underline-color: #6dca65;
                            ">
                                            <span style="mso-text-raise: 10pt; font-weight: bold">Join our Slack</span>
                                        </a>
                                    </p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style="
                        padding: 30px;
                        text-align: center;
                        font-size: 12px;
                        background-color: #f0f2f5;
                        color: #cccccc;
                      ">
                                <p style="margin: 0 0 8px 0">
                                    <a href="https://www.facebook.com/sustainableeducationfoundation"
                                       style="text-decoration: none">
                                        <img
                                                src="https://img.icons8.com/material-outlined/192/000000/facebook-f.png"
                                                alt="facebook-icon"
                                                height="40"
                                                width="40"
                                                style="display: inline-block; opacity: 0.35;">
                                    </a>
                                    <a href="https://twitter.com/goasksef" style="text-decoration: none">
                                        <img
                                                src="https://img.icons8.com/ios-filled/150/000000/twitter.png"
                                                alt="facebook-icon"
                                                height="35"
                                                width="35"
                                                style="display: inline-block; opacity: 0.35;">
                                    </a>
                                    <a href="https://www.linkedin.com/company/sefglobal/" style="text-decoration: none">
                                        <img
                                                src="https://img.icons8.com/windows/128/000000/linkedin-2.png"
                                                alt="facebook-icon"
                                                height="40"
                                                width="40"
                                                style="display: inline-block; opacity: 0.35;">
                                    </a>
                                    <a href="https://www.instagram.com/sefglobal/" style="text-decoration: none">
                                        <img
                                                src="https://img.icons8.com/material-outlined/192/000000/instagram-new--v1.png"
                                                alt="facebook-icon"
                                                height="40"
                                                width="40"
                                                style="display: inline-block; opacity: 0.35;">
                                    </a>
                                </p>
                                <p style="margin: 0; font-size: 14px; line-height: 20px">
                                    &copy; Sustainable Education Foundation - SEF 2024
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
        </div>
        `,
      }}
    />
  );
};

export default EmailTemplate;