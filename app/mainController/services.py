from app import config
from app import language
from app.libs.logger import logger
import requests,json
# from Crypto.Cipher import AES

class adminServices(object):
    """
        Class contains functions and attributes for authtentication
        Function: * getCampainge(sel)
    """
    def __init__(self, user):
        self.lang = {}
        self.lang = getattr(language, config.DEFAULT_LANG)
        self.user = user
        self.logger = logger()


    def adminlogin(self, request_data):
        """
            This function handles all logic related to login on the platform

            @Params : void
        """
        try:
            self.logger.write_to_console("EVENT", "Login request for " + str(request_data))

            url = config.API_URL + "/vote/voterauth"

            req_params = {
                "inst_user_id": request_data.get("user"),
                "token": request_data.get("token")
            }

            print("Req Params: ")
            print(req_params)
            print("URL: "+ url)
            response = requests.post(url, json=req_params, headers=config.DEF_HEADER, timeout=60)
            print("Res Params: ")
            print(response)
            print(response.text)
            voter_data = response.json()

            print(voter_data)
            return voter_data

        except requests.exceptions.ConnectionError as er:
            print(er)
            # Write logs to file
            return {"code": 104, "message": "FSB-VotePage: External Application Unreachable."}
        except requests.exceptions.ReadTimeout as er:
            print(er)
            # Write logs to file
            return {"code": 104, "message": "FSB-VotePage: Time out."}
        except Exception as e:
            print(e)
            # Write logs to file
            return {"code": 104, "message": "FSB-VotePage: System Error Occured."}

    def getPositionsAndCandidates(self, request_data):
        """
            This function handles all logic related to getting positions and their candidates

            @Params : void
        """
        try:
            self.logger.write_to_console("EVENT", "Login request for " + str(request_data))

            url = config.API_URL + "/vote/getfolio"

            req_params = {}
            print("Req Params: ")
            print(req_params)
            print("URL: " + url)
            response = requests.get(url, timeout=60)
            print("Res Params: ")
            print(response)
            print(response.text)
            post_cand_data = response.json()

            return post_cand_data

        except requests.exceptions.ConnectionError as er:
            print(er)
            # Write logs to file
            return {"code": 104, "message": "FSB-VotePage: External Application Unreachable."}
        except requests.exceptions.ReadTimeout as er:
            print(er)
            # Write logs to file
            return {"code": 104, "message": "FSB-VotePage: Time out."}
        except Exception as e:
            print(e)
            # Write logs to file
            return {"code": 104, "message": "FSB-VotePage: System Error Occurred."}

    def submitVotes(self, request_data):
        """
            This function handles all logic related to submit votes by voter to THE API

            @Params : void
        """
        try:
            self.logger.write_to_console("EVENT", "Login request for " + str(request_data))

            url = config.API_URL + "/vote/votecast"
            voter_id = self.user.get("inst_user_id")

            print("Raw Req Params: ")
            print(request_data)
            # Format request data to be sent to API
            req_params = self.formatCastVote(voter_id,request_data )

            # req_params = {
            #     "inst_user_id": self.user.get("inst_user_id"),
            #     "data": request_data
            # }

            print("Formatted Req Params: ")
            print(req_params)
            print("URL: " + url)
            response = requests.post(url, json=req_params, headers=config.DEF_HEADER, timeout=60)
            print("Res Params: ")
            print(response)
            print(response.text)
            post_cand_data = response.json()

            return post_cand_data

        except requests.exceptions.ConnectionError as er:
            print(er)
            # Write logs to file
            return {"code": 104, "message": "FSB-VotePage: External Application Unreachable."}
        except requests.exceptions.ReadTimeout as er:
            print(er)
            # Write logs to file
            return {"code": 104, "message": "FSB-VotePage: Time out."}
        except Exception as e:
            print(e)
            # Write logs to file
            return {"code": 104, "message": "FSB-VotePage: System Error Occurred."}

    def formatCastVote(self,voter_id,vote_details):
        request_data = {
            "voterId": voter_id
        }

        vote_data = []
        position_ids = vote_details.keys()

        for position_id in position_ids:
            post_detail = {
                "postId": position_id,
                "candId": vote_details.get(position_id)
            }

            vote_data.append(post_detail)

        request_data['vote'] = vote_data

        print("SSSSSSSSSSSSSSS")
        print(request_data)
        # cipher_text = self.encrypt(json.dumps(request_data),config.VOTER_DATA_AES_KEY)
        #
        # final_data = {
        #     "data": cipher_text
        # }

        return request_data

    def encrypt(self, plaintext, key):
        import pyaes, base64, os

        key = os.urandom(16)



        iv = os.urandom(16)

        print("Key is == " + str(key))
        print(base64.b64encode(iv + key).decode('utf8'))

        encrypter = pyaes.Encrypter(pyaes.AESModeOfOperationCBC(key, iv=iv))
        cyphertext = encrypter.feed(plaintext) + encrypter.feed()

        final_encrypted_text = base64.b64encode(iv + cyphertext).decode('utf8')

        print("Encrypted Text==" + str(final_encrypted_text))

        return final_encrypted_text