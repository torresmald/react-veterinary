
function Error({mensaje}) {
    return (
        <div className="bg-red-800 text-white uppercase p-3 mb-3 font rounded-lg">
            <p>{mensaje}</p>
        </div>
    );
}

export default Error;