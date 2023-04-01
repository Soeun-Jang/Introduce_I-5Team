from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('mongodb+srv://sparta:test@cluster0.ll021wu.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta



# index.html 파일 백엔드연결 API 시작
@app.route('/')
def home():

    return render_template('index.html')
# index.html 파일 백엔드연결 API 끝



# 방명록 입력 API 시작
@app.route('/guestbook_post', methods=['POST'])
def guestbook_post():
    guest_name_receive = request.form['guest_name_give']
    guest_password_receive = request.form['guest_password_give']
    guest_comment_receive = request.form['guest_comment_give']  

    num_list = list(db.i5_project.find({},{'_id':False}))
    
    if num_list:
        num = num_list[-1]['num']+1
    
    else:
        num = 1
    
    print(num)

    doc = {
        'num': num,
        'guest_name':guest_name_receive,
        'guest_password':guest_password_receive,
        'guest_comment':guest_comment_receive
    }
    db.i5_project.insert_one(doc)

    return jsonify({'msg':'방명록 저장 완료!'})
# 방명록 입력 API 끝



# 작성된 방명록 보여주기 API 시작
@app.route("/guestbook_show", methods=["GET"])
def guestbook_get():
    all_guestbook = list(db.i5_project.find({},{'_id':False}))

    return jsonify({'result': all_guestbook})
# 작성된 방명록 보여주기 API 끝



# 방명록 비밀번호 검사 API 시작
@app.route('/get_guestbook_data', methods=['GET'])
def del_check():
    num_list = list(db.i5_project.find({},{'_id':False}))

    return jsonify({'result': num_list})
# 방명록 비밀번호 검사 API 끝



# 방명록 삭제 API 시작
@app.route("/guestbook_del", methods=["DELETE"])
def del_box():
    num_receive = request.form['num_give']

    db.i5_project.delete_one({'num' : int(num_receive)})

    return jsonify({'msg':'삭제 완료!'})
# 방명록 삭제 API 끝



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)