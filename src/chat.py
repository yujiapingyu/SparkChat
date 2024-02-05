from flask import Flask, request, jsonify
from Spark.SparkApi import SparkApiClient  # 确保你有这个模块和类
from flask_cors import CORS  # 导入CORS
from config import appid, api_secret, api_key

app = Flask(__name__)
CORS(app)  # 为整个应用启用CORS

domain = "generalv2"    # v2.0版本
Spark_url = "ws://spark-api.xf-yun.com/v3.5/chat"  # v1.5环境的地址

client = SparkApiClient(appid, api_key, api_secret, Spark_url, domain)


text =[]

def getText(role,content):
    print('get text: {}'.format(content))
    jsoncon = {}
    jsoncon["role"] = role
    jsoncon["content"] = content
    text.append(jsoncon)
    return text

def getlength(text):
    length = 0
    for content in text:
        temp = content["content"]
        leng = len(temp)
        length += leng
    return length

def checklen(text):
    while (getlength(text) > 8000):
        del text[0]
    return text
    

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    question = data.get('question', {})
    if len(question) == 0:
        return jsonify({"error": "Question is required"}), 400

    ans = client.question(question)
    
    return jsonify({"response": ans})

if __name__ == '__main__':
    # text.clear()
    # client = SparkApiClient(appid, api_key, api_secret, Spark_url, domain)
    # while(1):
    #     inputText = input("\n" +"我:")
    #     question = checklen(getText("user", inputText)) 
    #     print('question:',question)   
    #     print("星火:",end = "")
    #     ans = client.question(question)
    #     getText("assistant", ans)
    #     # print(str(text))

    app.run(debug=True)

