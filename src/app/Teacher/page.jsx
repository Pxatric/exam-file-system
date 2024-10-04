import React from 'react';
import Navbar from '../components/Navbar';
import Container from '../components/Container';

function WelcomePage() {
  return (
    <Container>
      <Navbar />
      <div className="flex grow p-5">
        <aside className="w-1/4 bg-gray-200 p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Dashboard Menu</h2>
        </aside>
        <main className="flex-grow ml-5 p-5 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
          <p className="text-gray-700">Here you can find all the important information and tools you need to manage your tasks effectively.</p>
          {/* สามารถเพิ่มข้อมูลอื่น ๆ ที่เกี่ยวข้องได้ที่นี่ */}
        </main>
      </div>
    </Container>
  );
}

export default WelcomePage;
