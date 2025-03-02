import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

interface Commitment {
  commitment_asset_class: string;
  commitment_amount: number;
  commitment_currency: string;
}

interface Investor {
  investor_name: string;
  investor_type: string;
  investor_country: string;
  date_added: string;
  investor_last_updated: string;
}

function InvestorDetails() {
  const { id } = useParams<{ id: string }>();
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [filteredCommitments, setFilteredCommitments] = useState<Commitment[]>([]);
  const [assetClasses, setAssetClasses] = useState<string[]>([]);
  const [selectedAssetClass, setSelectedAssetClass] = useState<string>("All Commitments");

  useEffect(() => {
    fetch(`/investor/${id}`).then(
      res => res.json()
    ).then(
      data => {
        setInvestor(data.investor);
        setCommitments(data.commitments);
        setFilteredCommitments(data.commitments);
        const uniqueAssetClasses = [...new Set(data.commitments.map((c: Commitment) => c.commitment_asset_class))];
        setAssetClasses(uniqueAssetClasses as any);
      }
    )
  }, [id]);

  const filterByAssetClass = (assetClass: string) => {
    setSelectedAssetClass(assetClass);
    if (assetClass === "All Commitments") {
      setFilteredCommitments(commitments);
    } else {
      const filtered = commitments.filter(c => c.commitment_asset_class === assetClass);
      setFilteredCommitments(filtered);
    }
  };

  return (
    <div className="investor-details">
      {investor ? (
        <div>
          <h2>{investor.investor_name}</h2>
          <p>Type: {investor.investor_type}</p>
          <p>Country: {investor.investor_country}</p>
          <p>Date Added: {investor.date_added}</p>
          <p>Last Updated: {investor.investor_last_updated}</p>
          <h3>Commitments</h3>
          <div className="asset-class-buttons">
            <button
              className={selectedAssetClass === "All Commitments" ? "active" : ""}
              onClick={() => filterByAssetClass("All Commitments")}
            >
              All Commitments
            </button>
            {assetClasses.map((assetClass, i) => (
              <button
                key={i}
                className={selectedAssetClass === assetClass ? "active" : ""}
                onClick={() => filterByAssetClass(assetClass)}
              >
                {assetClass}
              </button>
            ))}
          </div>
          <table className="commitments-table">
            <thead>
              <tr>
                <th>Asset Class</th>
                <th>Currency</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredCommitments.map((commitment, i) => (
                <tr key={i}>
                  <td>{commitment.commitment_asset_class}</td>
                  <td>{commitment.commitment_currency}</td>
                  <td>{(commitment.commitment_amount / 1_000_000).toFixed(1)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default InvestorDetails;