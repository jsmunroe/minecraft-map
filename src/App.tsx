import MapView from './components/MapView'
import { useState } from 'react'
import { Location } from './models/Location'
import { Path } from './models/Path'
import AddEditLocation from './components/forms/AddEditLocation'
import AddEditPath from './components/forms/AddEditPath'
import Modal from './components/common/Modal'
import './App.css'

function App() {
    const [addEditLocation, setAddEditLocation] = useState<Partial<Location> | null>(null)
    const [addEditPath, setAddEditPath] = useState<Partial<Path> | null>(null);

    const handleAdd = (setter: React.Dispatch<any>) => () => {
        setter({});
    }

    const handleSubmit = (setter: React.Dispatch<any>) => () => {
        setter(null);
    }

    return (
        <div className="app">
            <MapView />

            <div className="toolbar">
                <button className="mode-button" onClick={handleAdd(setAddEditLocation)} title ="Add Location">
                    <img src="src/assets/add-location.svg" alt="Add Location" />
                </button>

                <button className="mode-button" onClick={handleAdd(setAddEditPath)} title ="Add Path">
                    <img src="src/assets/add-path.svg" alt="Add Path" />
                </button>
            </div>
            
            {!!addEditLocation && <Modal>
                <AddEditLocation location={addEditLocation} onSubmit={handleSubmit(setAddEditLocation)} />
            </Modal>}

            {!!addEditPath && <Modal>
                <AddEditPath path={addEditPath} onSubmit={handleSubmit(setAddEditPath)} />
            </Modal>}
        </div>
    )
}

export default App
