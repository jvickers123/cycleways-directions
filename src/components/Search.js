import React from 'react'

const Search = ({ setOriginalRoute, setStartPoint, setEndPoint }) => {
  

  return (
    <>
      <h2>Search</h2>
      <button
        onClick={
          () => {
            setOriginalRoute('qinyHxwS@ALEB?D@b@d@HJLPRZEVENm@|@JTd@r@|@fACJAHBJLTNUHKDGV[JOBA@CBU^e@f@g@x@w@J@@ABCPMNKFEJKf@_@b@WLUTOt@c@HGFCTKx@]XK\\Db@MDAp@QFAREBA@AB?HCB?BO`@Ij@MDHJCDABKz@QRBF?FARCXEHA@?BGHKHE\\EREF?J?F?NCNAZETCRCt@IPEdAMh@Gd@Il@KRCJELED?@B@@BHBJ@@BBD@D@DAr@IPCrBY|@MDAVAVAFAvASz@IB?NATAhB?|ABHAL?F?D@@?D?@@@?BBHHFHPRJHFBJFH@F@DA@?PETKHEFANEFAFAPAF?tJNT@r@@h@QHCJ@D?J@EJAL?j@?L?Z?ZAd@?\\?H?dA@tABZHz@Nj@Nh@Jl@BP@T@dD@R@H@HDTDRBJVhAFZH`@@DKFW@e@??l@')
            setStartPoint([-0.106410, 51.524247])
            setEndPoint([-0.110081, 51.507752,])
          }
        }
        >
          Search
        </button>
    </>
    
  )
}

export default Search