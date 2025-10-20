export default function Header({ title, onAdd, showAdd }){
    return(
        <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
            <div className="mx-auto max-w-5xl px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onAdd}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                            showAdd 
                                ? 'bg-red-600 hover:bg-red-700 text-white' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                    >
                        {showAdd ? 'Close' : 'Add Task'}
                    </button>
                    <span className="text-gray-400 text-sm font-medium">MERN Week 3 Class</span>
                </div>
            </div>
        </header>
    );
}
