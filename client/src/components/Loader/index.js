import {TailSpin} from 'react-loader-spinner'

import './index.css'

const Loader = () => (
  <div className="loader-container">

    <TailSpin
      height={70}
      width={70}
      color="#2563eb"
      ariaLabel="loading"
    />

    <p>Loading...</p>

  </div>
)

export default Loader