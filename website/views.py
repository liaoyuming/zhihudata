# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.views.generic.base import TemplateView
from website.models import *

def index(request):
    return HttpResponse(123)

class IndexPageView(TemplateView):
    template_name = 'website/index.html'

class DataAnalysisPageView(TemplateView):
    template_name = 'website/data_analysis.html'

    def get_context_data(self, **kwargs):
        context = super(DataAnalysisPageView, self).get_context_data(**kwargs)
        context['latest_answers'] = Answers.objects.all()[:5]
        return context

class RankingStatisticsPageView(TemplateView):
    template_name = 'website/ranking_statistics.html'


class FetchingStatisticsPageView(TemplateView):
    template_name = 'website/fetching_statistics.html'
