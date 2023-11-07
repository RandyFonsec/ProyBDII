import React from 'react';
import Card from 'react-bootstrap/Card';


const cardStyle = { 
  border: '1px', 
  boxShadow: '5px 5px 10px 0px rgba(0,0,0,0.5)', 
  borderRadius: '10px' 
}

function CustomCard({ title, children }) {
  return (
    <div style={cardStyle}>
      {/*!-- Paddings & margins --*/}
      <Card className="mt-5 px-2 py-2">
        <Card.Body className="px-2 ps-2">
          <Card.Title className="mb-4 fs-2">{title}</Card.Title>
          <div className="ms-4">  
            {children}
          </div>  
        </Card.Body>
      </Card>
    </div>
  );
}

export default CustomCard;
