'use client';

import { useEffect, useState, CSSProperties } from 'react';
import axios from 'axios';

interface Lawyers {
    imgUrl: string;
    name: string;
    subject: string;
    birth: string;
    office: string;
    address: string;
    
    
}

const LawyersList: React.FC = () => {
    const [lawyersList, setLawyersList] = useState<Lawyers[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/crawlers/list');
                setLawyersList(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {lawyersList.map((lawyers, index) => (
                <div key={index} className="lawyers-item">
                    {/* <img src={lawyers.imgUrl} width="70" height="90" /> */}
                    <p><strong>Name:</strong>{lawyers.name}</p>
                    <p><strong>Subject:</strong> {lawyers.subject}</p>
                    <p><strong>Birth Year:</strong> {lawyers.birth}</p>
                    <p><strong>Office:</strong> {lawyers.office}</p>
                    <p><strong>Address:</strong> {lawyers.address}</p>
                </div>
            ))}
        </div>
    );
};


// const styles: { [key: string]: CSSProperties } = {
//   container: {
//     padding: '20px',
//     backgroundColor: '#f0f0f0',
//     color: '#333',
//     maxWidth: '1200px',
//     margin: 'auto'
//   },
//   header: {
//     textAlign: 'center',
//     marginBottom: '20px'
//   },
//   newsContainer: {
//     border: '1px solid #ccc',
//     padding: '20px',
//     borderRadius: '10px',
//     backgroundColor: '#fff',
//     overflowY: 'auto'
//   },
//   newsGrid: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '20px',
//     justifyContent: 'center'
//   },
//   newsCard: {
//     width: '300px',
//     border: '1px solid #ddd',
//     borderRadius: '10px',
//     overflow: 'hidden',
//     boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   imageLink: {
//     display: 'block'
//   },
//   image: {
//     width: '100%',
//     height: 'auto',
//     objectFit: 'cover'
//   },
//   cardContent: {
//     padding: '15px',
//     display: 'flex',
//     flexDirection: 'column',
//     flexGrow: 1
//   },
//   title: {
//     fontSize: '18px',
//     fontWeight: 'bold',
//     color: '#000',
//     textDecoration: 'none',
//     marginBottom: '10px'
//   },
//   content: {
//     fontSize: '14px',
//     color: '#666',
//     flexGrow: 1
//   }
// };

export default LawyersList;