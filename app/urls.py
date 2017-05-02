from django.conf.urls import url
from app.views import *

urlpatterns = [
    url(r'data_analysis$', DataAnalysisPageView.as_view(), name='data_analysis'),
    url(r'ranking_statistics$', RankingStatisticsPageView.as_view(), name='ranking_statistics'),
    url(r'fetching_statistics$', FetchingStatisticsPageView.as_view(), name='fetching_statistics'),
    url(r'$', IndexPageView.as_view(), name='index'),
]
