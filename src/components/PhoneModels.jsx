import React, { useState, useEffect } from 'react';
import '../App.css';

const PhoneModels = () => {
  const [phones, setPhones] = useState([]);
  const [filt, setFilt] = useState([]);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(8); 

  useEffect(() => {
    getPhones().then((data) => {
      const brandMap = new Map();
      data.data.forEach(brand => {
        if (brand.device_list.length > 0) {
          brandMap.set(brand.key, brand.device_list[0]);
        }
      });
      const selectedPhones = Array.from(brandMap.values());
      setPhones(selectedPhones);
      setFilt(selectedPhones);
    });
  }, []);

  useEffect(() => {
    const filtPhone = phones.filter(phone =>
      phone.key.split('_')[0].toLowerCase().includes(search.toLowerCase())
    );
    setFilt(filtPhone);
  }, [search, phones]);

  async function getPhones() {
    const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=GrHIgBavLz7NvkJpo9Aza9Dgr7xHsGV1MMtGkvnIRH-NWp1CSIAZdJZTlKhHkW1KoRT327EdZN6e_ezGyuihrY-qkFlI9M0BOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa4pnGhI-QCZWhNyvRKriuF5-tmPgQSwc8sxz1uiZAK3_c0ogS2arIVTAcWpziBxjo2QrNN-hNMx0pHTbIXzH8hU2Ihy5cXoNcrafaPElc9Se8IOGcq2tpkPYvdWmQlM8qw&lib=MHaCt2eC2dILPKC-BoQ9dcVY-IZcfP7n5');
    const data = await response.json();
    return data;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by brand"
          onChange={e => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <h1>Phone Models Component</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filt.slice(0, count).map((phone) => (
          <div key={phone.key} className='phones'>
            <div>
              <div>
                <img src={phone.device_image} alt={phone.device_name} />
              </div>
              <div style={{ paddingTop: '30px' }}>
                <h2>{phone.key.split('_')[0].toUpperCase()}</h2>
                <p>{phone.device_name}</p>
                <p>{phone.device_type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {count < filt.length && (
          <button onClick={() => setCount(count + 5)}>Show More</button>
        )}
        {count > 5 && (
          <button onClick={() => setCount(5)}>Show Less</button>
        )}
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
      >
        Back to Top
      </button>
    </div>
  );
};

export default PhoneModels;
