import MapView from './components/MapView'
import { useState } from 'react'
import { Location } from './models/Location'
import AddEditLocation from './components/forms/AddEditLocation'
import Modal from './components/common/Modal'
import './App.css'

function App() {
    const [addEditLocation, setAddEditLocation] = useState<Partial<Location> | null>(null)

    const handleAdd = () => {
        setAddEditLocation({});
    }

    const handleSubmit = () => {
        setAddEditLocation(null);
    }

    return (
        <div className="app">
            <MapView />

            <button className="mode-button" onClick={handleAdd} title ="Add">
                <img src="src/assets/add.svg" alt="Add" />
            </button>

            {!!addEditLocation && <Modal>
                <AddEditLocation location={addEditLocation} onSubmit={handleSubmit} />
            </Modal>}
        </div>
    )
}

export default App
