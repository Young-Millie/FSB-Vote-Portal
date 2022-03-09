uwsgi --http 0.0.0.0:8081 --module run:app --pythonpath ./ --logto /var/web/web.app/flaskApps/bosch_portal/logs/application.log  --master --processes 2 --threads 4

#uwsgi --http 0.0.0.0:8082 --module run:app --pythonpath ./ --logto /run/media/emil/YOUNG\ MILLIE/PROGRAMMING/NSANO/PORTAL/bosch_portal/logs/application.log  --master --processes 2 --threads 4

