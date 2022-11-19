import DogCard from "./dogCard"



export default function DogList({ dogs }) {

    return (
        <>
            <div >
                {dogs &&
                    dogs.map(dog => {
                        return (
                            <DogCard
                                id={dog.id}
                                name={dog.nombre}
                                image={dog.image}
                                weight={dog.peso}
                                temperaments={dog.temperaments}
                            />
                        );
                    })}
            </div>
        </>
    )
}

DogList.defaultProps = {
    dogs: Array(10).fill('holi')
}