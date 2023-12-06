const TestPage = () => {
    return (
        <div className="w-full flex items-center justify-center min-h-screen flex-col">
            <button onClick={_ => setMode("edit")} type="button" className="py-2 px-5 rounded">
                edit
            </button>
        </div>
    )
}

export default TestPage