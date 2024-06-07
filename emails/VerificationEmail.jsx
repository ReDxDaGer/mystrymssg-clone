import * as React from 'react'
import { Htlm , Body , Head , Heading , Text , Font , Preview, Row} from '@react-email/components'


export default function VerificationEmail({ username , otp }) {
  return (
    <Html lang="en" dir="ltr">
        <Head>
            <title>Verify your email address</title>
            <Font
            fontFamily="Roboto"
            fallbackFont="Verdana" 
            webFont = {{url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxK.woff2',style: 'normal',weight: '400',format: 'woff2'}}
            />
        </Head>
        <Preview>Here&apos;s your verification code: {otp} </Preview>
        <Section>
            <Row>
                <Heading as='h2'>Hello {username} ,</Heading>
            </Row>
            <Row>
                <Text>
                    Thank you for the registring. Please use the following code to complete your registration.
                </Text>
            </Row>
            <Row>
                <Text>
                    Verification code: {otp}
                </Text>
            </Row>
        </Section>
      
    </Html>
  )
}