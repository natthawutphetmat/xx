"use client"


import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import QRCode from 'qrcode.react'; // Import QRCode library
import PaymentPage from './PaymentPage'



export default function Home() {



  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch("https://api.webadsapp.io/bil/");
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await res.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    let total = 0;
    data.forEach((ads) => {
      total += ads.price + ads.ads_price; 
    });
    setTotalPrice(total);
  }, [data]);

  const copyText = () => {
    const textToCopy = '1761696374';
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Text copied to clipboard');
        setCopySuccess(true); 
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000); 
      })
      .catch(err => {
        console.error('Unable to copy text: ', err);
      });
  };

  const handlePrint = () => {
    console.log('Print button clicked!');
  };
  const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
  };
 return (
    <>
      <PaymentPage/>
      <main id='box'>

        {data && data.map(ads => (
          <div key={ads.id}>
            <div className="container">
              <div className="text-center mt-3">
              <a href={`/${ads.id}`}>
                <Image src='/img/favicon.ico' width={70} height={70} className='mt-5' /></a>
                <p>@adsmanager 0956422872</p>
                <h6>ใบเสนอราคา แจ้งรายละเอียดบริการต่าง</h6>
              </div>
              <div className="mt-5"></div>

              <div class="d-flex justify-content-around">
             <h5> ลูกค้า : {ads.namebil}</h5>
             <h6> No. 2024{ads.id}</h6>

           
             </div>
              <div className="linecut "></div>
              <div className="text-center mt-3">
                รายละเอียดบริการ
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">รายละเอียด</th>
                    <th scope="col"></th>
                    <th scope="col">ยอดเงิน</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td>{ads.name}</td>
                    <td></td>
                    <td>{ads.price}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>{ads.ads}</td>
                    <td></td>
                    <td>{ads.ads_price}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td><b>Total Price</b></td>

                    <td><b>{totalPrice}บาท</b></td>
                  </tr>
                </tbody>
              </table>
              <div className="linecut"></div>

              <div className="a">
                <div className="b"></div>
                <div className="c">
                  <div className="text-center">
                    <Image src="/img/b.jpg" width={80} height={80} className='mt-3' />
                    <h5>ธนาคารกสิกรไทย</h5>
                    <h6>น.ส เจริญ กายสิทธิ์</h6>
                    <h3>1761696374</h3>
                    {copySuccess && <p style={{ color: 'green' }}>คัดลอก '1761696374' แล้ว!</p>}
                    <button className='mt-3' onClick={copyText}>Copy</button>

                  </div>

                </div>

              </div>


            </div>
          </div>
        ))}

        <button onClick={handlePrint}>Print</button>

      </main>
    </>
  );
}