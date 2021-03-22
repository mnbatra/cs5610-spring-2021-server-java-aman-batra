package com.example.wbdvsp2101amanbatraserverjava.services;
import com.example.wbdvsp2101amanbatraserverjava.models.Widget;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class WidgetService {
    private final List<Widget> widgets = new ArrayList<>();{
//        Widget w1 = new Widget(123l, "ABC123", "HEADING", 1, "Welcome to Widgets");
//        Widget w2 = new Widget(234l, "ABC234", "PARAGRAPH", 1, "This is a paragraph");
//        Widget w3 = new Widget(345l, "ABC234", "HEADING", 2, "Welcome to WebDev");
//        Widget w4 = new Widget(456l, "ABC234", "PARAGRAPH", 1, "Lorem ipsum");
//        widgets.add(w1);
//        widgets.add(w2);
//        widgets.add(w3);
//        widgets.add(w4);
    }

    public Widget createWidget(String tid, Widget widget){
        widget.setTopicId(tid);
        widget.setId((new Date()).getTime());
        widgets.add(widget);
        return widget;
    }

    public List<Widget> findAllWidgets() {
        return widgets;
    }

    public Widget findWidgetById(Long id) {
        for(Widget w: widgets) {
            if(w.getId().equals(id)) {
                return w;
            }
        }
        return null;
    }

    public List<Widget> findWidgetsForTopic(String tid) {
        return widgets.stream().filter(widget -> widget.getTopicId().equals(tid))
                .collect(Collectors.toList());
    }

    public int updateWidget(Long wid, Widget updatedWidget) {
        for (int i = 0; i < this.widgets.size(); i++) {
            Widget widget = widgets.get(i);
            if (widget.getId().equals(wid)) {
                this.widgets.set(i, updatedWidget);
                return 1;
            }
        }
        return -1;
    }

    public Integer deleteWidget(Long id) {
        int index = -1;
        for(int i=0; i<widgets.size(); i++) {
            Widget w = widgets.get(i);
            if(w.getId().equals(id)) {
                index = i;
            }
        }
        if(index >= 0) {
            widgets.remove(index);
            return 1;
        }
        return -1;
    }


}
