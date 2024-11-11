import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

const main = {
  backgroundColor: '#dbddde',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const sectionLogo = {
  padding: '0 40px',
};

const headerBlue = {
  marginTop: '-1px',
};

const container = {
  margin: '30px auto',
  backgroundColor: '#fff',
  borderRadius: 5,
  overflow: 'hidden',
};

const containerContact = {
  backgroundColor: '#f0fcff',
  width: '90%',
  borderRadius: '5px',
  overflow: 'hidden',
  paddingLeft: '20px',
};

const heading = {
  fontSize: '14px',
  lineHeight: '26px',
  fontWeight: '700',
  color: '#004dcf',
};

const paragraphContent = {
  padding: '0 40px',
};

const paragraphList = {
  paddingLeft: 40,
};

const paragraph = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#3c4043',
};

const link = {
  ...paragraph,
  color: '#004dcf',
};

const hr = {
  borderColor: '#e8eaed',
  margin: '20px 0',
};

export const InformationUpdateEmail = (info: any) => (
  <Html>
    <Head />
    <Preview>CẬP NHẬT TÌNH TRẠNG VÀ TRẠNG THÁI ĐƠN</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={paragraphContent}>
          <Hr style={hr} />
          <Text style={heading}>CẬP NHẬT TÌNH TRẠNG VÀ TRẠNG THÁI ĐƠN</Text>
          <Text style={paragraph}>Chào {info.fullName} ,</Text>
        </Section>
        <Section style={paragraphList}>
          <Text style={paragraph}>
            Đơn của bạn đã được xem xét bởi kiểm sát viên, dưới đây là thông tin
            chi tiết về đơn của bạn.
          </Text>
        </Section>
        <Section style={paragraphList}>
          <Text style={paragraph}>Họ và tên: {info.fullName}</Text>
          <Text style={paragraph}>Địa chỉ e-mail: {info.email}</Text>
          <Text style={paragraph}>CCCD/CMND: {info.identityCard}</Text>
          <Text style={paragraph}>Tỉnh/Thành: {info.province}</Text>
          <Text style={paragraph}>Quận/Huyện: {info.district}</Text>
          <Text style={paragraph}>Phường/Xã: {info.ward}</Text>
          <Text style={paragraph}>Loại đơn: {info.kindOfApplication}</Text>
          <Text style={paragraph}>Lĩnh vực: {info.fieldOfApplication}</Text>
        </Section>
        <Section style={paragraphContent}>
          <Text style={paragraph}>
            Chúng tôi đã xem xét đơn của bạn và một số điều đã làm rõ theo như
            đơn của bạn đã báo cáo cho chúng tôi.
          </Text>
          <Hr style={hr} />
        </Section>
      </Container>
    </Body>
  </Html>
);

export default InformationUpdateEmail;
