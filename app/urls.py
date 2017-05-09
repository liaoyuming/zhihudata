from django.conf.urls import url
from app.views import *

urlpatterns = [
    url(r'index$', IndexPageView.as_view(), name='index'),
    url(r'user_map$', UserMapPageView.as_view(), name='user_map'),
    url(r'user_rank$', UserRankPageView.as_view(), name='user_rank'),
    url(r'user_major$', UserMajorPageView.as_view(), name='user_major'),
    url(r'answer_rank$', AnswerRankPageView.as_view(), name='answer_rank'),
    url(r'ranking_statistics$', RankingStatisticsPageView.as_view(), name='ranking_statistics'),
    url(r'fetching_statistics$', FetchingStatisticsPageView.as_view(), name='fetching_statistics'),
    url(r'$', DataAnalysisPageView.as_view(), name='data_analysis'),
]
