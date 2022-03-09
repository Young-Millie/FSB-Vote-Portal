import os
import datetime
import uuid
import hashlib, random,json
import base64
import requests
from cryptography.fernet import Fernet, InvalidToken
from app import config

class Utilites():
    """docstring for log"""
    
    '''
    Generate user password
    '''
    def generate_password(self, log_level, msg, extra_data=None):
        # Get time
        today = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S:%f")
        # Form message
        msg = str(today) + " | " + log_level + " | " + msg + "\n"   
        # Print to screen
        print(msg)
        pass

    '''
    Send email
    '''
    def send_mail(self, subject, msg, receipients):
        # Get time
        # today = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S:%f")
        # Form message
        # msg = str(today) + " | " + log_level + " | " + msg + "\n"
        print("Printing subject")
        print(subject)

        print("Printing msg")
        print(msg)

        print("Printing receipients")
        print(receipients)


        details = {

                'file' : '',
                'file1' : '',
                'subject' : subject,
                'message' : msg,
                'recipients' : receipients,
                'signature': '',
                'sender_name' : 'VOTE',
                'sender_email' : '',
                'password':''
                
            }

        response = requests.post(url="", data=details).json()
        print("Printing email Reponse")
        print(response)

        return response

    def call_et_api(self, module, group="user", details={}):
        req_obj={"apiKey": "0657015ea18b7233bb2841dd0499cdf4f2fce88c", \
             "apiVersion": "v1_0", \
             "module": module, \
             "group": group, \
             "details": details \
            }
        print(req_obj)
        headers = { 'Content-Type': 'application/json' }
        result = requests.post("http://127.0.0.1:5055", data=json.dumps(req_obj), headers=headers)
        result = json.loads(result.text)
        #conn = http.client.HTTPConnection("45.79.139.232:5055")
        #conn.request("POST", "/", json.dumps(req_obj), headers)

        #res = conn.getresponse()
        #data = res.read()
        #result = data.decode("utf-8")
        print("Got Reponse  ")
        print(result)
        return result


    def initiateManillaTransactionData(self, data):
        order_id = str(uuid.uuid4()).replace('-','')[:15]
        checksum = self.checksum_generator(self, data['source_ip'], '301152115708', data['amount'])

        data['order_id'] = order_id
        data['checksum'] = checksum
        data['merchant_id'] = '301152115708'

        res = {"code": "00", "message":"Initiated", "data":data}
        return res


    def checksum_generator(self, merchant_ip, merchant_id, total_amount):
        info = '{0}{1}{2}'.format(merchant_ip, merchant_id, total_amount)
        salt_size = 6
        chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        _salt = ''.join(random.choice(chars) for i in range(salt_size))
        _checksum = hashlib.md5(info.encode('utf-8')).hexdigest()
        _checksum = list(_checksum)
        _checksum.insert(5, _salt)
        _checksum = ''.join(_checksum)
        return _checksum

    def encrypt_url_params(self, json_data):
        '''
            This function takes a JSON object and encrypts it
        '''
        try:
            print("ENCRYPTION REQUEST DATA == "+ str(json_data))

            #Convert the json to string to bytes
            my_str_as_bytes = str.encode(json.dumps(json_data))
            # type(my_str_as_bytes)

            #Do the actual encryption
            cipher_suite = Fernet(config.FORGOT_PASSWORD_SECURITY_KEY)
            cipher_text = cipher_suite.encrypt(my_str_as_bytes)

            #Convert the byte results to string
            final_msg = cipher_text.decode("utf-8") 

            print("THE FINAL ENCRYPTION DATA == "+ final_msg)
            return final_msg
        except InvalidToken as ie:
            print(ie)
            return "InvalidToken"
        except Exception as e:
            print(e)
            return None

    def decrypt_url_params(self, message_to_encrypt):
        '''
            This function takes a byte data format and decrypts it
        '''
        try:
            print("DECRYPTION REQUEST DATA == "+ str(message_to_encrypt))

            #Convert the byte to string
            mega = message_to_encrypt.encode("utf-8") 

            #Do the actual decryption
            cipher_suite = Fernet(config.FORGOT_PASSWORD_SECURITY_KEY)
            plain_text = cipher_suite.decrypt(mega)

            #Convert the byte results to string
            my_decoded_str = plain_text.decode()

            # type(my_decoded_str) # ensure it is string representation

            #Convert my_decoded_str back to its original json 
            final_msg = json.loads(my_decoded_str)
            print("THE FINAL DECRYPTION DATA == "+ str(final_msg))
            return final_msg
        except InvalidToken as ie:
            print(ie)
            return "InvalidToken"
        except Exception as e:
            print(e)
            return None