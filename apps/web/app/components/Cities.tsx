export default function Cities() {
    const cities = ["Bangalore", "Chennai", "Delhi", "Gurugram", "Hyderabad", "Kolkata", "Mumbai"];

    return (
        <div className="w-full bg-gray-400 flex gap-4 px-16 py-1">
            {cities.map((city) => (
                <div key={city} className="">
                    <h1>{city}</h1>
                </div>
            ))
            }
        </div>
    )

}