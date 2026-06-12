import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description, index = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '30px',
        backgroundColor: 'rgba(28, 31, 38, 0.4)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default'
      }}
      whileHover={{ 
        scale: 1.02, 
        backgroundColor: 'rgba(28, 31, 38, 0.8)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
      }}
    >
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'rgba(30, 75, 216, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--tv-blue)',
        marginBottom: '20px'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '10px' }}>{title}</h3>
      <p style={{ color: 'var(--tv-text-muted)', fontSize: '15px', lineHeight: '1.5' }}>{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
