'use client';

import { useEffect, useState } from 'react';
import { FaHotel, FaConciergeBell, FaBed } from 'react-icons/fa';

const Counter = ({ target, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(target);
        if (start === end) return;

        const duration = 2000;
        const incrementTime = 30;
        const step = Math.ceil((end / duration) * incrementTime);

        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                start = end;
                clearInterval(timer);
            }
            setCount(start);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [target]);

    return <span className="transition-all">{count}{suffix}</span>;
};

const NumberTicker = () => {
    const stats = [
        { title: "Total Rooms", number: 240, icon: <FaHotel size={32} className="text-[#3972C1]" /> },
        { title: "Services", number: "100%", isPercent: true, icon: <FaConciergeBell size={32} className="text-[#3972C1]" /> },
        { title: "Luxury Rooms", number: 80, suffix: "+", icon: <FaBed size={32} className="text-[#3972C1]" /> },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-xl">
            {stats.map((item, index) => (
                <div key={index} className="bg-white hover:shadow-xl transition-shadow duration-300 shadow-md rounded-xl p-6 text-center">
                    <div className="flex justify-center mb-3">
                        {item.icon}
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">{item.title}</h3>
                    <p className="text-4xl font-extrabold text-[#3972C1]">
                        {item.isPercent
                            ? item.number
                            : <Counter target={item.number} suffix={item.suffix || ""} />}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default NumberTicker;
