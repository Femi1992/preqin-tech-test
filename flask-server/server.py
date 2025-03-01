from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('investors.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/investors')
def investors():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM investors')
    investors = cursor.fetchall()

    investors_list = []
    for investor in investors:
        investor_dict = dict(investor)
        cursor.execute('SELECT * FROM commitments WHERE investor_id = ?', (investor['id'],))
        commitments = cursor.fetchall()
        total_commitment = sum([commitment['commitment_amount'] for commitment in commitments])
        rounded_total_commitment = round(total_commitment / 1_000_000_000, 1)
        investor_dict['total_commitment_billion'] = rounded_total_commitment
        investors_list.append(investor_dict)

    conn.close()
    return jsonify(investors_list)

@app.route('/investor/<int:id>')
def investor(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM investors WHERE id = ?', (id,))
    investor = cursor.fetchone()
    cursor.execute('SELECT * FROM commitments WHERE investor_id = ?', (id,))
    commitments = cursor.fetchall()
    conn.close()

    if investor is None:
        return jsonify({'error': 'Investor not found'}), 404

    investor_dict = dict(investor)

    commitments_list = []
    for investor_commitment in commitments:
        commitments_list.append(dict(investor_commitment))

    return jsonify({'investor': investor_dict, 'commitments': commitments_list})

if __name__ == '__main__':
    app.run(port=8000, debug=True)