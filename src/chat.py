from flask import Flask, request, jsonify
from Spark.SparkApi import SparkApiClient  # 确保你有这个模块和类
from flask_cors import CORS  # 导入CORS
from config import appid, api_secret, api_key

app = Flask(__name__)
CORS(app)  # 为整个应用启用CORS

domain = "generalv2"    # v2.0版本
Spark_url = "ws://spark-api.xf-yun.com/v3.5/chat"  # v1.5环境的地址

client = SparkApiClient(appid, api_key, api_secret, Spark_url, domain)
 
@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    question = data.get('question', {})
    if len(question) == 0:
        return jsonify({"error": "Question is required"}), 400

    ans = client.question(question)
    
    return jsonify({"response": ans})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

