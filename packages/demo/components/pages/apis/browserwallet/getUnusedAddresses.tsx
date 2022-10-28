import { useState } from 'react';
import Codeblock from '../../../ui/codeblock';
import Card from '../../../ui/card';
import RunDemoButton from '../../../common/runDemoButton';
import RunDemoResult from '../../../common/runDemoResult';
import SectionTwoCol from '../../../common/sectionTwoCol';
import useWallet from '../../../../contexts/wallet';
import ConnectCipWallet from '../../../common/connectCipWallet';

export default function GetUnusedAddresses() {
  return (
    <SectionTwoCol
      sidebarTo="getUnusedAddresses"
      header="Get Unused Addresses"
      leftFn={Left()}
      rightFn={Right()}
    />
  );
}

function Left() {
  return (
    <>
      <p>Returns a list of unused addresses controlled by the wallet.</p>
    </>
  );
}

function Right() {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<null | any>(null);
  const { wallet, walletConnected, hasAvailableWallets } = useWallet();

  async function runDemo() {
    setLoading(true);
    let results = await wallet.getUnusedAddresses();
    setResponse(results);
    setLoading(false);
  }
  return (
    <>
      {hasAvailableWallets && (
        <Card>
          <Codeblock
            data={`const unusedAddresses = await wallet.getUnusedAddresses();`}
            isJson={false}
          />
          {walletConnected ? (
            <>
              <RunDemoButton
                runDemoFn={runDemo}
                loading={loading}
                response={response}
              />
              <RunDemoResult response={response} />
            </>
          ) : (
            <ConnectCipWallet />
          )}
        </Card>
      )}
    </>
  );
}
