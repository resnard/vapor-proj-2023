import React from 'react';
import { 
  Page, 
  Font,
  Text, 
  View, 
  Image, 
  Document, 
  StyleSheet,
} from '@react-pdf/renderer';
import trebuchetFont from './fonts/trebuc.ttf';
console.log(trebuchetFont);

Font.register({ family: 'Trebuchet', src: trebuchetFont});
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ECEFF4',
    padding: 30,
    marginRight: 20,
    fontFamily: 'Trebuchet'
  },
  section: {
    margin: 10,
    marginBottom: 35,
    padding: 10,
    flexGrow: 1
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'right',
    color: 'grey',
    position: 'absolute',
    top: 10,
    right: 0
  },
  closingR: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
    position: 'absolute',
    bottom: 30,
    left:0,
    right:0,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 35
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 30

  },
  text: {
    fontSize: 14,
    margin: 5,
    color: '#191919'
  },
  table: {
    display: 'table',
    width: 'auto',
    // margin: 'auto',
    marginBottom: 10
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row'
  },
  tableColHeader: {
    width: '30%',
    border: 1,
    borderStyle: 'solid',
    backgroundColor: '#D9D9D9',
    padding: 5,
    fontWeight: 'bold'
  },
  tableCol: {
    width: '70%',
    border: 1,
    borderStyle: 'solid',
    padding: 5
  },
  logo: {
    width: 100,
    height: 40,
    
  },
//   table: {
//     display: 'table',
//     width: 'auto',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     marginBottom: 10,
//   },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#D8DEE9',
    borderBottomColor: '#000',
    borderBottomWidth: 1,

  },
  tableHeaderCell: {
    margin: 'auto',
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '25%',
    padding: 3,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    width: '25%',
    padding: 3,
    fontSize: 12
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 60,
    right: 60,
    textAlign: 'center',
    fontSize: 12,
    marginTop: 20,
  },
});

const Receipt = ({ receiptData }) => (

  <Document>
    <Page style={styles.page}>
        <View>
          <Image src="/images/vapor_logo_d.png" style={styles.logo} />
          <Text style={styles.header}>Date of Purchase: {receiptData.date}</Text>
          <Text style={styles.title}>INVOICE</Text>
          <Text style={styles.subtitle}></Text>
          </View>
        <View>
          <Text style={styles.text}>Customer Name: {receiptData.customer}</Text>
          <Text style={styles.text}>Phone No: +(63){receiptData.phone}</Text>
          <Text style={styles.text}>Address: {receiptData.address},{receiptData.city},{receiptData.country},{receiptData.postal}</Text>
          
        </View>
        <View>
        <Text style={styles.text}></Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableHeaderCell}>Game</Text>
            <Text style={styles.tableHeaderCell}>Platform</Text>
            <Text style={styles.tableHeaderCell}>Genre</Text>
            <Text style={styles.tableHeaderCell}>Quantity</Text>
            <Text style={styles.tableHeaderCell}>Price</Text>
          </View>
          {receiptData.items.map((items) => (
          <View key={items.id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{items.name}</Text>
            <Text style={styles.tableCell}>{items.platform}</Text>
            <Text style={styles.tableCell}>{items.genre}</Text>
            <Text style={styles.tableCell}>{items.quantity}</Text>
            <Text style={styles.tableCell}>${items.price}.00</Text>
          </View>
          ))}
        </View>
        <Text style={styles.text}></Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Tax: ${receiptData.tax}</Text>
          <Text style={styles.text}>Shipping Fee: ${receiptData.shipping}</Text>
          <Text style={styles.text}>Subtotal: ${receiptData.subtotal}</Text>
          <Text style={styles.text}>Total Price: ${receiptData.totalprice}</Text>
          {/* <Text style={styles.text}></Text> */}
          <Text style={styles.subtitle}>Thank you for shopping at Vapor!</Text>
        </View>
        {/* <View style={styles.section}>  */}
        <Text style={styles.closingR}>Vapor: Game Shop. All Rights Reserved. 2023.</Text>
        {/* </View> */}
    </Page>
  </Document>


);
// sessionStorage.removeItem('orderInfo');
// localStorage.removeItem('shippingInfo');
// localStorage.removeItem('cartItems');
export default Receipt;